
import { FC } from 'react';
import { useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '../components/ui/button';

const CuisineDetails: FC = () => {
  const [, params] = useRoute('/cuisines/:id');
  const cuisineId = params?.id;

  const { data: cuisine, isLoading } = useQuery({
    queryKey: ['cuisine', cuisineId],
    queryFn: async () => {
      const response = await fetch(`/api/cuisines/${cuisineId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cuisine');
      }
      return response.json();
    },
    enabled: !!cuisineId,
  });

  const { data: dishes, isLoading: isDishesLoading } = useQuery({
    queryKey: ['cuisineDishes', cuisineId],
    queryFn: async () => {
      const response = await fetch(`/api/cuisines/${cuisineId}/dishes`);
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
      }
      return response.json();
    },
    enabled: !!cuisineId,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Loading cuisine details...</p>
      </div>
    );
  }

  if (!cuisine) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-xl">Cuisine not found</p>
        <Link href="/cuisines">
          <Button className="mt-4">Back to Cuisines</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section 
        className="bg-emerald-700 text-white py-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(6, 78, 59, 0.8), rgba(6, 78, 59, 0.8)), url(${cuisine.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">{cuisine.name}</h1>
          <p className="text-xl max-w-3xl mx-auto">{cuisine.description}</p>
        </div>
      </section>
      
      {/* Dishes Grid */}
      <section className="py-16 bg-[#FFFAF0]">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-8 text-center">Available Dishes</h2>
          
          {isDishesLoading ? (
            <p className="text-center">Loading dishes...</p>
          ) : dishes && dishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dishes.map((dish) => (
                <div key={dish.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <img src={dish.imageUrl} alt={dish.name} className="w-full h-56 object-cover" />
                    {dish.isPopular && (
                      <div className="absolute top-0 right-0 bg-orange-700 text-white px-3 py-1 m-2 rounded-full text-sm font-['Poppins']">Popular</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-['Playfair_Display'] text-xl font-semibold">{dish.name}</h3>
                      <span className="font-['Poppins'] text-emerald-700 font-medium">₹{dish.price}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{dish.description}</p>
                    
                    <div className="flex space-x-2 mb-4">
                      {dish.isVegan && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Vegan</span>
                      )}
                      {dish.isGlutenFree && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Gluten-Free</span>
                      )}
                    </div>
                    
                    <Link href={`/dishes/${dish.id}`}>
                      <a className="text-emerald-700 hover:text-orange-700 font-['Poppins'] flex items-center">
                        <span>View Details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No dishes available for this cuisine.</p>
          )}
          
          <div className="text-center mt-12">
            <Link href="/menu-builder">
              <Button className="bg-emerald-700 hover:bg-emerald-800">
                Create Custom Platter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CuisineDetails;
