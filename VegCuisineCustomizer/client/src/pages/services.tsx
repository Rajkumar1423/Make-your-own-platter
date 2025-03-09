
import React, { FC } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const Services: FC = () => {
  return (
    <>
      {/* Page Header */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Our Catering Services</h1>
          <p className="text-xl max-w-3xl mx-auto">Customizable vegetarian catering solutions for every occasion.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Wedding Catering" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Wedding Catering</h3>
                <p className="text-gray-600 mb-4">Make your special day memorable with our customized wedding menus that cater to diverse tastes and dietary preferences.</p>
                <ul className="mb-4 text-gray-600">
                  <li className="mb-1">• Customized menus</li>
                  <li className="mb-1">• Professional staff</li>
                  <li className="mb-1">• Elegant presentation</li>
                  <li className="mb-1">• Setup and cleanup included</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Corporate Events" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Corporate Events</h3>
                <p className="text-gray-600 mb-4">Impress your clients and employees with our professional corporate catering services for meetings, conferences, and company celebrations.</p>
                <ul className="mb-4 text-gray-600">
                  <li className="mb-1">• Boxed lunch options</li>
                  <li className="mb-1">• Buffet style service</li>
                  <li className="mb-1">• Dietary accommodations</li>
                  <li className="mb-1">• On-time delivery</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Family Gatherings" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Family Gatherings</h3>
                <p className="text-gray-600 mb-4">Create lasting memories with our family gathering catering services, perfect for reunions, holiday celebrations, and special occasions.</p>
                <ul className="mb-4 text-gray-600">
                  <li className="mb-1">• Family-style service</li>
                  <li className="mb-1">• Kid-friendly options</li>
                  <li className="mb-1">• Flexible menu selection</li>
                  <li className="mb-1">• Custom portion sizing</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Service Card 4 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Birthday Parties" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Birthday Parties</h3>
                <p className="text-gray-600 mb-4">Celebrate your special day with our birthday catering services that can be customized to match your theme and preferences.</p>
                <ul className="mb-4 text-gray-600">
                  <li className="mb-1">• Theme-based menu options</li>
                  <li className="mb-1">• Dessert stations</li>
                  <li className="mb-1">• Appetizer platters</li>
                  <li className="mb-1">• Cake cutting service</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Service Card 5 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1470753323753-3f8091bb0232?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Private Dining" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Private Dining</h3>
                <p className="text-gray-600 mb-4">Enjoy an intimate dining experience with our private chef services, bringing restaurant-quality meals to the comfort of your home.</p>
                <ul className="mb-4 text-gray-600">
                  <li className="mb-1">• Personalized menu planning</li>
                  <li className="mb-1">• Professional chef service</li>
                  <li className="mb-1">• Wine pairing options</li>
                  <li className="mb-1">• Full-service experience</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
            
            {/* Service Card 6 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src="https://images.unsplash.com/photo-1556125574-d7f27ec36a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Cooking Classes" className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Cooking Classes</h3>
                <p className="text-gray-600 mb-4">Learn the art of vegetarian cooking with our hands-on cooking classes led by experienced chefs.</p>
                <ul className="mb-4 text-gray-600">
                  <li className="mb-1">• Group or private sessions</li>
                  <li className="mb-1">• Cuisine-specific workshops</li>
                  <li className="mb-1">• All ingredients provided</li>
                  <li className="mb-1">• Recipe booklets included</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Our Catering Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">We follow a simple yet effective process to ensure that your catering experience is seamless and meets your expectations.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Consultation</h3>
              <p className="text-gray-600">We start with a detailed consultation to understand your requirements, preferences, and budget constraints.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Menu Planning</h3>
              <p className="text-gray-600">Our chefs craft a customized menu based on your preferences, incorporating seasonal ingredients and dietary requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Execution</h3>
              <p className="text-gray-600">On the day of your event, our team handles everything from setup to service, ensuring a seamless experience for you and your guests.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Our Pricing</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">We offer transparent pricing based on your specific requirements. Here are our starting packages:</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Basic Package</h3>
                <div className="text-4xl font-bold text-emerald-700 mb-2">$25<span className="text-base font-normal text-gray-600">/person</span></div>
                <p className="text-gray-600">Perfect for small gatherings and casual events.</p>
              </div>
              <div className="p-6">
                <ul className="mb-6 text-gray-600">
                  <li className="mb-2">• 2 appetizers</li>
                  <li className="mb-2">• 1 main course</li>
                  <li className="mb-2">• 2 side dishes</li>
                  <li className="mb-2">• 1 dessert</li>
                  <li className="mb-2">• Non-alcoholic beverages</li>
                  <li className="mb-2">• Basic table setup</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-emerald-700 transform scale-105">
              <div className="bg-emerald-700 text-white text-center py-2 text-sm font-semibold">MOST POPULAR</div>
              <div className="p-6 border-b">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Premium Package</h3>
                <div className="text-4xl font-bold text-emerald-700 mb-2">$40<span className="text-base font-normal text-gray-600">/person</span></div>
                <p className="text-gray-600">Ideal for weddings and corporate events.</p>
              </div>
              <div className="p-6">
                <ul className="mb-6 text-gray-600">
                  <li className="mb-2">• 4 appetizers</li>
                  <li className="mb-2">• 2 main courses</li>
                  <li className="mb-2">• 3 side dishes</li>
                  <li className="mb-2">• 2 desserts</li>
                  <li className="mb-2">• Premium beverage station</li>
                  <li className="mb-2">• Elegant table setup</li>
                  <li className="mb-2">• Waitstaff service</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800">Book Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Luxury Package</h3>
                <div className="text-4xl font-bold text-emerald-700 mb-2">$60<span className="text-base font-normal text-gray-600">/person</span></div>
                <p className="text-gray-600">The ultimate catering experience for special occasions.</p>
              </div>
              <div className="p-6">
                <ul className="mb-6 text-gray-600">
                  <li className="mb-2">• 6 appetizers</li>
                  <li className="mb-2">• 3 main courses</li>
                  <li className="mb-2">• 4 side dishes</li>
                  <li className="mb-2">• Dessert station</li>
                  <li className="mb-2">• Premium open bar</li>
                  <li className="mb-2">• Luxury table setup</li>
                  <li className="mb-2">• Professional waitstaff</li>
                  <li className="mb-2">• Event coordination</li>
                </ul>
                <Link href="/booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 text-gray-600">
            <p>* Prices may vary based on location, guest count, and specific requirements.</p>
            <p>** Custom packages available upon request.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6">Ready to Create Your Custom Menu?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">Contact us today to discuss your event requirements and let us craft the perfect vegetarian catering experience for you.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/booking">
              <Button className="bg-white text-emerald-700 hover:bg-gray-100">Book a Consultation</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-emerald-600">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
