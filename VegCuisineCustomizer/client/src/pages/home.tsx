import { FC } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, Users } from 'lucide-react';
import StarRating from '@/components/ui/star-rating';

const Home: FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="relative bg-cover bg-center h-screen" style={{backgroundImage: "url('https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Make Your Own Platter</h1>
            <p className="text-lg md:text-xl mb-8">Create your perfect menu from our diverse selection of pure vegetarian cuisine options, tailored to your event needs.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu-builder">
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-6 rounded-lg font-['Poppins'] font-semibold transition">
                  Build Your Menu
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-white hover:bg-opacity-90 text-emerald-700 border-emerald-700 px-6 py-6 rounded-lg font-['Poppins'] font-semibold transition">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a href="#services" className="text-white animate-bounce">
            <ChevronDown className="h-8 w-8" />
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">Our Catering Services</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">We provide comprehensive catering solutions for various events with customizable menus, professional setup, and experienced staff.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Wedding Catering" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Wedding Catering</h3>
                <p className="text-gray-600 mb-4">Make your special day memorable with our customized wedding menus that cater to diverse tastes and dietary preferences.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4" />
                  <span>50-500+ guests</span>
                </div>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Corporate Events" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Corporate Events</h3>
                <p className="text-gray-600 mb-4">Elevate your corporate gatherings with professional catering services designed to impress clients and motivate teams.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4" />
                  <span>20-300+ guests</span>
                </div>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-[#F5F5F5] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src="https://images.unsplash.com/photo-1529543544282-cdab85927b0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Family Gatherings" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Family Gatherings</h3>
                <p className="text-gray-600 mb-4">Create lasting memories with delicious food at your family reunions, anniversaries, and special celebrations.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4" />
                  <span>10-100+ guests</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/menu-builder">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-lg font-['Poppins'] font-semibold transition">
                Explore Our Menu Options
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cuisine Section Preview */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">Our Cuisine Offerings</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Choose from our diverse range of pure vegetarian cuisines, each prepared with fresh ingredients and authentic flavors.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cuisine Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="South Indian Cuisine" className="w-full h-56 object-cover" />
                <div className="absolute top-0 right-0 bg-orange-700 text-white px-3 py-1 m-2 rounded-full text-sm font-['Poppins']">Popular</div>
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">South Indian</h3>
                <p className="text-gray-600 mb-4">Authentic dosas, idlis, vadas and more with traditional chutneys and sambars.</p>
                <Link href="/menu-builder">
                  <a className="text-emerald-700 hover:text-orange-700 font-['Poppins'] flex items-center">
                    <span>View Dishes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            
            {/* More cuisine cards... */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="North Indian Cuisine" className="w-full h-56 object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">North Indian</h3>
                <p className="text-gray-600 mb-4">Rich curries, fluffy naans, aromatic biryanis and traditional sweets.</p>
                <Link href="/menu-builder">
                  <a className="text-emerald-700 hover:text-orange-700 font-['Poppins'] flex items-center">
                    <span>View Dishes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Chinese Cuisine" className="w-full h-56 object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Chinese</h3>
                <p className="text-gray-600 mb-4">Flavorful stir-fries, noodles, and Indo-Chinese fusion specialties.</p>
                <Link href="/menu-builder">
                  <a className="text-emerald-700 hover:text-orange-700 font-['Poppins'] flex items-center">
                    <span>View Dishes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Italian Cuisine" className="w-full h-56 object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Italian</h3>
                <p className="text-gray-600 mb-4">Authentic pastas, pizzas, risottos and delectable desserts.</p>
                <Link href="/menu-builder">
                  <a className="text-emerald-700 hover:text-orange-700 font-['Poppins'] flex items-center">
                    <span>View Dishes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/cuisines">
              <Button variant="outline" className="border-emerald-700 text-emerald-700 hover:bg-emerald-50 mt-4">
                View All Cuisines
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Hear from customers who have experienced our catering services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 italic mb-4">"The food was absolutely delicious and the presentation was beautiful. Everyone at our wedding was impressed with the variety and quality of dishes."</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya & Raj</h4>
                    <p className="text-sm text-gray-500">Wedding Reception</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 2 */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={4.5} />
                </div>
                <p className="text-gray-600 italic mb-4">"Make Your Own Platter handled our corporate event flawlessly. The menu customization was simple, and the food was fresh and delicious. Will definitely use their services again."</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vikram Singh</h4>
                    <p className="text-sm text-gray-500">Corporate Event</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 3 */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <StarRating rating={5} />
                </div>
                <p className="text-gray-600 italic mb-4">"The diversity of cuisine options was perfect for our family gathering. Everyone found something they loved, and the staff was professional and attentive."</p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Anjali Mehta</h4>
                    <p className="text-sm text-gray-500">Family Reunion</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Perfect Menu?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-8">Start building your customized vegetarian catering menu today and impress your guests with delicious, fresh food.</p>
          <Link href="/menu-builder">
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 text-lg rounded-lg font-['Poppins'] font-semibold transition">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
