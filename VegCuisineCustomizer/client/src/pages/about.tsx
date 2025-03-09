
import { FC } from 'react';

const About: FC = () => {
  return (
    <>
      {/* Page Header */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">Learn more about our journey in bringing authentic vegetarian cuisine to your events.</p>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto">
              <p>Make Your Own Platter began with a simple idea: to bring together the diverse flavors of vegetarian cuisine for special events and celebrations. Founded in 2015, we started as a small family business with a passion for authentic vegetarian cooking.</p>
              
              <p>What sets us apart is our commitment to using fresh, locally-sourced ingredients and traditional cooking methods. Each dish is prepared with care, ensuring that the authentic flavors and nutritional value are preserved.</p>
              
              <p>Over the years, we've grown to serve a wide range of events, from intimate family gatherings to large corporate functions. Our customizable platter options allow clients to create personalized menus that cater to their specific tastes and dietary requirements.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Quality</h3>
              <p className="text-gray-600">We never compromise on the quality of ingredients or preparation methods. Every dish we serve meets our high standards.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">While respecting traditional recipes, we're not afraid to innovate and create new flavor combinations that delight our customers.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Customer Satisfaction</h3>
              <p className="text-gray-600">Your satisfaction is our priority. We work closely with each client to ensure their expectations are not just met, but exceeded.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Chef Priya" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold">Priya Sharma</h3>
              <p className="text-emerald-700 mb-2">Head Chef</p>
              <p className="text-gray-600">With over 15 years of experience in vegetarian cuisine, Priya brings authentic flavors to every dish.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Rajesh" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold">Rajesh Patel</h3>
              <p className="text-emerald-700 mb-2">Founder & CEO</p>
              <p className="text-gray-600">Rajesh founded Make Your Own Platter with a vision to share his family's culinary traditions.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Ananya" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold">Ananya Singh</h3>
              <p className="text-emerald-700 mb-2">Event Coordinator</p>
              <p className="text-gray-600">Ananya ensures that every catering event runs smoothly from planning to execution.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
