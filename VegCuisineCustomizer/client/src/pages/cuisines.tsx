import { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

interface DishCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isPopular?: boolean;
}

const DishCard: FC<DishCardProps> = ({ 
  name, 
  description, 
  price, 
  image, 
  isVegan = false, 
  isGlutenFree = false,
  isPopular = false
}) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {isPopular && (
          <Badge className="absolute top-2 right-2 bg-orange-700">Popular</Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-['Playfair_Display'] text-lg font-semibold">{name}</h3>
          <span className="text-orange-700 font-semibold">₹{price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {isVegan && (
            <Badge variant="outline" className="text-emerald-700 border-emerald-700">Vegan</Badge>
          )}
          {isGlutenFree && (
            <Badge variant="outline" className="text-amber-700 border-amber-700">Gluten-Free</Badge>
          )}
        </div>
        <Button variant="outline" className="w-full border-emerald-700 text-emerald-700 hover:bg-emerald-50">
          Add to Menu
        </Button>
      </CardContent>
    </Card>
  );
};

const Cuisines: FC = () => {
  return (
    <>
      {/* Page Header */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Our Cuisine Categories</h1>
          <p className="text-xl max-w-3xl mx-auto">Explore our diverse range of pure vegetarian cuisines prepared with authentic flavors and fresh ingredients.</p>
        </div>
      </section>
      
      {/* Cuisine Tabs */}
      <section className="py-16 bg-[#FFFAF0]">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="south-indian" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-[#F5F5F5]">
                <TabsTrigger value="south-indian" className="font-['Poppins']">South Indian</TabsTrigger>
                <TabsTrigger value="north-indian" className="font-['Poppins']">North Indian</TabsTrigger>
                <TabsTrigger value="chinese" className="font-['Poppins']">Chinese</TabsTrigger>
                <TabsTrigger value="italian" className="font-['Poppins']">Italian</TabsTrigger>
              </TabsList>
            </div>
            
            {/* South Indian Tab Content */}
            <TabsContent value="south-indian">
              <div className="mb-8">
                <div className="max-w-3xl mx-auto text-center mb-10">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">South Indian Cuisine</h2>
                  <p className="text-gray-600">Authentic South Indian dishes with traditional flavors. Known for fermented rice and lentil batters, coconut, and aromatic spices.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DishCard 
                    name="Masala Dosa" 
                    description="Crispy rice crepe filled with spiced potatoes, served with sambar and chutney." 
                    price={120} 
                    image="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                    isPopular={true}
                  />
                  
                  <DishCard 
                    name="Idli Sambar" 
                    description="Steamed rice cakes served with lentil soup, spices and vegetables." 
                    price={80} 
                    image="https://images.unsplash.com/photo-1626776876729-bab4e4622756?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                  />
                  
                  <DishCard 
                    name="Medu Vada" 
                    description="Savory lentil donuts with a crispy exterior and soft interior." 
                    price={70} 
                    image="https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                  />
                  
                  <DishCard 
                    name="Pongal" 
                    description="Rice and lentil porridge seasoned with cumin, pepper, and ghee." 
                    price={90} 
                    image="https://images.unsplash.com/photo-1589554557863-9dc4673ff701?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isGlutenFree={true}
                  />
                  
                  <DishCard 
                    name="Uthappam" 
                    description="Thick rice pancake topped with vegetables and spices." 
                    price={110} 
                    image="https://images.unsplash.com/photo-1626776876731-c7d2d7b56af7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                    isGlutenFree={true}
                  />
                  
                  <DishCard 
                    name="Mysore Pak" 
                    description="Traditional sweet made from gram flour, ghee, and sugar." 
                    price={60} 
                    image="https://images.unsplash.com/photo-1633321702518-7feccafb94d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isGlutenFree={true}
                    isPopular={true}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/menu-builder">
                  <Button className="bg-emerald-700 hover:bg-emerald-800">
                    Add South Indian Dishes to Your Menu
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* North Indian Tab Content */}
            <TabsContent value="north-indian">
              <div className="mb-8">
                <div className="max-w-3xl mx-auto text-center mb-10">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">North Indian Cuisine</h2>
                  <p className="text-gray-600">Rich and flavorful dishes from North India featuring aromatic spices, creamy curries, and fresh-baked breads.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DishCard 
                    name="Paneer Butter Masala" 
                    description="Cottage cheese in rich tomato gravy with butter and cream." 
                    price={180} 
                    image="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isPopular={true}
                  />
                  
                  <DishCard 
                    name="Dal Makhani" 
                    description="Creamy black lentil stew cooked with butter and spices." 
                    price={150} 
                    image="https://images.unsplash.com/photo-1586377310720-6d2b7f6ebc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isPopular={true}
                  />
                  
                  <DishCard 
                    name="Chana Masala" 
                    description="Spiced chickpeas in a savory tomato-based sauce." 
                    price={140} 
                    image="https://images.unsplash.com/photo-1616669944447-d65c0d9cc104?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                    isGlutenFree={true}
                  />
                  
                  <DishCard 
                    name="Vegetable Biryani" 
                    description="Fragrant rice dish with mixed vegetables and aromatic spices." 
                    price={160} 
                    image="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isGlutenFree={true}
                  />
                  
                  <DishCard 
                    name="Garlic Naan" 
                    description="Soft bread with garlic, baked in a tandoor oven." 
                    price={40} 
                    image="https://images.unsplash.com/photo-1633512689367-1e3e078c68d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  />
                  
                  <DishCard 
                    name="Gulab Jamun" 
                    description="Sweet milk solids balls soaked in rose-flavored syrup." 
                    price={80} 
                    image="https://images.unsplash.com/photo-1602657959289-71d4bea0c7e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isPopular={true}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/menu-builder">
                  <Button className="bg-emerald-700 hover:bg-emerald-800">
                    Add North Indian Dishes to Your Menu
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* Chinese Tab Content */}
            <TabsContent value="chinese">
              <div className="mb-8">
                <div className="max-w-3xl mx-auto text-center mb-10">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Chinese Cuisine</h2>
                  <p className="text-gray-600">Indo-Chinese fusion dishes with flavorful sauces, stir-fries, and unique vegetarian adaptations.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DishCard 
                    name="Veg Manchurian" 
                    description="Vegetable dumplings in a spicy, sweet and tangy sauce." 
                    price={160} 
                    image="https://images.unsplash.com/photo-1600628860782-e80d020787e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                    isPopular={true}
                  />
                  
                  <DishCard 
                    name="Hakka Noodles" 
                    description="Stir-fried noodles with vegetables and soy sauce." 
                    price={140} 
                    image="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                  />
                  
                  <DishCard 
                    name="Spring Rolls" 
                    description="Crispy rolls filled with vegetables and vermicelli." 
                    price={100} 
                    image="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                  />
                  
                  <DishCard 
                    name="Veg Fried Rice" 
                    description="Stir-fried rice with mixed vegetables and soy sauce." 
                    price={130} 
                    image="https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                    isGlutenFree={true}
                  />
                  
                  <DishCard 
                    name="Chilli Paneer" 
                    description="Cottage cheese in spicy sauce with bell peppers and onions." 
                    price={170} 
                    image="https://images.unsplash.com/photo-1567188040759-fb8a6db8cd8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isPopular={true}
                  />
                  
                  <DishCard 
                    name="Sweet Corn Soup" 
                    description="Creamy soup with sweet corn kernels and vegetables." 
                    price={90} 
                    image="https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isGlutenFree={true}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/menu-builder">
                  <Button className="bg-emerald-700 hover:bg-emerald-800">
                    Add Chinese Dishes to Your Menu
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
            
            {/* Italian Tab Content */}
            <TabsContent value="italian">
              <div className="mb-8">
                <div className="max-w-3xl mx-auto text-center mb-10">
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Italian Cuisine</h2>
                  <p className="text-gray-600">Authentic Italian vegetarian dishes featuring fresh herbs, robust sauces, and handcrafted pastas and pizzas.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DishCard 
                    name="Margherita Pizza" 
                    description="Classic pizza with tomato sauce, mozzarella, and fresh basil." 
                    price={220} 
                    image="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isPopular={true}
                  />
                  
                  <DishCard 
                    name="Pasta Arrabbiata" 
                    description="Pasta in spicy tomato sauce with garlic and herbs." 
                    price={180} 
                    image="https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isVegan={true}
                  />
                  
                  <DishCard 
                    name="Mushroom Risotto" 
                    description="Creamy rice dish with mushrooms, parmesan, and white wine." 
                    price={200} 
                    image="https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isGlutenFree={true}
                  />
                  
                  <DishCard 
                    name="Garlic Bread" 
                    description="Toasted bread with garlic butter and herbs." 
                    price={80} 
                    image="https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  />
                  
                  <DishCard 
                    name="Vegetable Lasagna" 
                    description="Layered pasta with vegetables, cheese, and tomato sauce." 
                    price={240} 
                    image="https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  />
                  
                  <DishCard 
                    name="Tiramisu" 
                    description="Classic Italian dessert with coffee-soaked ladyfingers and mascarpone." 
                    price={150} 
                    image="https://images.unsplash.com/photo-1571877227200-a0d98ea2553d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    isPopular={true}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/menu-builder">
                  <Button className="bg-emerald-700 hover:bg-emerald-800">
                    Add Italian Dishes to Your Menu
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Cuisine Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">About Our Cuisines</h2>
              <p className="text-gray-600 mb-6">All our dishes are prepared using high-quality ingredients and authentic cooking methods. Our experienced chefs ensure that each cuisine retains its traditional flavors while catering to modern dietary preferences.</p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">100% Vegetarian</span>
                    <p className="text-gray-600 text-sm">All dishes are prepared in a 100% vegetarian kitchen</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Special Diet Options</span>
                    <p className="text-gray-600 text-sm">Vegan, gluten-free, and other dietary options available</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Fresh Ingredients</span>
                    <p className="text-gray-600 text-sm">We source locally grown produce when possible</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium">Customizable Spice Levels</span>
                    <p className="text-gray-600 text-sm">Adjust spice levels to suit your guests' preferences</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Food Preparation" className="rounded-lg shadow-md h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Fresh Ingredients" className="rounded-lg shadow-md h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1611784728558-6a7645e72da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Cooking" className="rounded-lg shadow-md h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1608835291093-394b0c943a75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Plated Food" className="rounded-lg shadow-md h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">Create Your Perfect Menu</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">Mix and match dishes from different cuisines to create the perfect menu for your event.</p>
          <Link href="/menu-builder">
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 text-lg">
              Start Building Your Menu
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Cuisines;
