
import { FC } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '../components/ui/button';

const DishDetails: FC = () => {
  const [, params] = useRoute('/dishes/:id');
  const dishId = params?.id;

  const { data: dish, isLoading } = useQuery({
    queryKey: ['dish', dishId],
    queryFn: async () => {
      const response = await fetch(`/api/dishes/${dishId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dish');
      }
      return response.json();
    },
    enabled: !!dishId,
  });

  const { data: cuisine, isLoading: isCuisineLoading } = useQuery({
    queryKey: ['cuisine', dish?.cuisineId],
    queryFn: async () => {
      const response = await fetch(`/api/cuisines/${dish.cuisineId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cuisine');
      }
      return response.json();
    },
    enabled: !!dish?.cuisineId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading dish details...</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Dish not found</p>
        <Link href="/dishes">
          <Button className="mt-4">Back to Dishes</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Dish Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Dish Image */}
            <div className="lg:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src={dish.imageUrl} 
                  alt={dish.name} 
                  className="w-full h-[500px] object-cover"
                />
                {dish.isPopular && (
                  <div className="absolute top-0 right-0 bg-orange-700 text-white px-3 py-1 m-4 rounded-full text-sm font-['Poppins']">Popular</div>
                )}
              </div>
            </div>
            
            {/* Dish Info */}
            <div className="lg:w-1/2">
              <div className="mb-2">
                {!isCuisineLoading && cuisine && (
                  <Link href={`/cuisines/${cuisine.id}`}>
                    <a className="text-emerald-700 hover:text-emerald-800 font-['Poppins'] text-sm">
                      {cuisine.name} Cuisine
                    </a>
                  </Link>
                )}
              </div>
              
              <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">{dish.name}</h1>
              
              <p className="text-gray-600 text-lg mb-6">{dish.description}</p>
              
              <div className="flex space-x-3 mb-6">
                {dish.isVegan && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Vegan</span>
                )}
                {dish.isGlutenFree && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Gluten-Free</span>
                )}
              </div>
              
              <div className="mb-8">
                <h3 className="font-['Poppins'] text-2xl text-emerald-700 font-semibold">₹{dish.price}</h3>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button className="bg-emerald-700 hover:bg-emerald-800">
                  Add to Platter
                </Button>
                
                <Link href="/menu-builder">
                  <Button variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                    Create Custom Platter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Suggestions Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-8 text-center">You Might Also Like</h2>
          
          {/* This would ideally use a query to get related dishes */}
          <div className="text-center mt-8">
            <Link href="/dishes">
              <Button variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                View All Dishes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default DishDetails;
