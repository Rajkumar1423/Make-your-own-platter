
import React from 'react';
import { Link } from 'wouter';

const Dishes: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Dishes</h1>
      <p className="text-center mb-12">Browse our selection of vegetarian dishes from various cuisines.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Sample dishes - these would typically come from an API */}
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Link key={id} href={`/dishes/${id}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">Dish {id}</h3>
                <p className="text-gray-600 mt-2">A delicious vegetarian dish with fresh ingredients.</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dishes;
