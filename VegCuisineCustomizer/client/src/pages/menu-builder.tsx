import { FC, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Minus, Plus, ShoppingCart, Trash2, User } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { apiRequest } from '@/lib/queryClient';
import { insertBookingSchema } from '@shared/schema';

// Types based on schema
type Cuisine = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

type Dish = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  cuisineId: number;
  isVegan: boolean;
  isGlutenFree: boolean;
  isPopular: boolean;
};

type SelectedDish = Dish & {
  quantity: number;
};

// Define the booking form schema
const bookingFormSchema = insertBookingSchema.extend({
  dishes: z.string().optional(), // This will be handled programmatically
  totalPrice: z.string().optional(), // This will be handled programmatically
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const MenuBuilder: FC = () => {
  const [activeCuisine, setActiveCuisine] = useState<number | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<SelectedDish[]>([]);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      eventType: 'wedding',
      eventDate: '',
      guestCount: 50,
      message: '',
    },
  });

  // Fetch cuisines
  const { data: cuisines, isLoading: cuisinesLoading } = useQuery({
    queryKey: [`/api/cuisines`],
  });

  // Fetch dishes based on selected cuisine
  const { data: dishes, isLoading: dishesLoading } = useQuery({
    queryKey: [`/api/dishes${activeCuisine ? `?cuisineId=${activeCuisine}` : ''}`],
    enabled: cuisines?.length > 0,
  });

  // Set first cuisine as active once loaded
  useEffect(() => {
    if (cuisines?.length && !activeCuisine) {
      setActiveCuisine(cuisines[0].id);
    }
  }, [cuisines, activeCuisine]);

  // Handle dish selection
  const addDishToSelection = (dish: Dish) => {
    setSelectedDishes(prev => {
      const existingDish = prev.find(d => d.id === dish.id);
      if (existingDish) {
        return prev.map(d => 
          d.id === dish.id ? { ...d, quantity: d.quantity + 1 } : d
        );
      } else {
        return [...prev, { ...dish, quantity: 1 }];
      }
    });
  };

  // Handle quantity changes
  const updateDishQuantity = (id: number, change: number) => {
    setSelectedDishes(prev => {
      return prev.map(dish => {
        if (dish.id === id) {
          const newQuantity = Math.max(1, dish.quantity + change);
          return { ...dish, quantity: newQuantity };
        }
        return dish;
      });
    });
  };

  // Remove dish from selection
  const removeDish = (id: number) => {
    setSelectedDishes(prev => prev.filter(dish => dish.id !== id));
  };

  // Calculate totals
  const calculatedPrices = selectedDishes.reduce((acc, dish) => {
    const dishTotal = parseFloat(dish.price) * dish.quantity;
    acc.subtotal += dishTotal;
    return acc;
  }, { subtotal: 0 });

  const serviceCharge = calculatedPrices.subtotal * 0.1;
  const tax = calculatedPrices.subtotal * 0.05;
  const total = calculatedPrices.subtotal + serviceCharge + tax;
  const guestCount = form.watch('guestCount') || 50;
  const perPersonCost = guestCount > 0 ? total / guestCount : 0;

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormValues) => {
      if (selectedDishes.length === 0) {
        throw new Error("Please select at least one dish");
      }

      // Add the selected dishes and total to the form data
      const bookingData = {
        ...data,
        dishes: JSON.stringify(selectedDishes),
        totalPrice: total.toString()
      };

      return apiRequest('POST', '/api/bookings', bookingData);
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Submitted",
        description: "We'll get back to you soon to confirm your booking!",
      });
      setSelectedDishes([]);
      form.reset();
      // Redirect to home after successful booking
      setTimeout(() => setLocation('/'), 2000);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: BookingFormValues) => {
    if (selectedDishes.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one dish for your menu",
        variant: "destructive",
      });
      return;
    }

    createBookingMutation.mutate(data);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue('eventDate', e.target.value);
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Create Your Perfect Menu</h1>
          <p className="text-xl max-w-3xl mx-auto">Customize your menu by selecting dishes from our various cuisine options. Our pricing is dynamically calculated based on your selections and guest count.</p>
        </div>
      </section>

      {/* Menu Builder */}
      <section id="menu-builder" className="py-16 bg-[#FFFAF0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel: Event Details & Cuisine Categories */}
            <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Event Details</h3>
              
              <div className="mb-6">
                <Label htmlFor="event-type">Event Type</Label>
                <Select 
                  defaultValue="wedding" 
                  onValueChange={value => form.setValue('eventType', value)}
                >
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="family">Family Gathering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="guest-count">Number of Guests</Label>
                <Input 
                  id="guest-count" 
                  type="number" 
                  min="10" 
                  className="mt-1" 
                  {...form.register('guestCount', { valueAsNumber: true })}
                />
                {form.formState.errors.guestCount && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.guestCount.message}</p>
                )}
              </div>
              
              <div className="mb-6">
                <Label htmlFor="event-date">Event Date</Label>
                <div className="relative">
                  <Input 
                    id="event-date" 
                    type="date" 
                    className="mt-1" 
                    onChange={handleDateChange}
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/4 text-gray-400 pointer-events-none" />
                </div>
                {form.formState.errors.eventDate && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.eventDate.message}</p>
                )}
              </div>
              
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4 mt-8">Cuisine Categories</h3>
              
              {cuisinesLoading ? (
                <div className="flex justify-center p-4">
                  <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-2">
                  {cuisines?.map((cuisine: Cuisine) => (
                    <button 
                      key={cuisine.id}
                      onClick={() => setActiveCuisine(cuisine.id)}
                      className={`w-full py-2 px-4 rounded-lg mb-2 text-left transition-colors ${
                        activeCuisine === cuisine.id 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-white border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {cuisine.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Middle Panel: Dish Selection */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Select Dishes</h3>
              
              {dishesLoading ? (
                <div className="flex justify-center p-8">
                  <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : dishes?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No dishes available for this cuisine.
                </div>
              ) : (
                <div className="space-y-4">
                  {dishes?.map((dish: Dish) => (
                    <div 
                      key={dish.id}
                      className="flex justify-between items-center p-3 border-b border-gray-100 hover:bg-[#F5F5F5] rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center">
                        <img 
                          src={dish.imageUrl} 
                          alt={dish.name} 
                          className="w-16 h-16 object-cover rounded-md mr-4" 
                        />
                        <div>
                          <h4 className="font-medium">{dish.name}</h4>
                          <p className="text-sm text-gray-500">{dish.description}</p>
                          <div className="flex mt-1 space-x-1">
                            {dish.isVegan && (
                              <Badge variant="outline" className="text-emerald-700 text-xs border-emerald-700">Vegan</Badge>
                            )}
                            {dish.isGlutenFree && (
                              <Badge variant="outline" className="text-amber-700 text-xs border-amber-700">Gluten-Free</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-semibold mr-4">₹{dish.price}</span>
                        <Button 
                          size="icon"
                          variant="default"
                          className="bg-emerald-700 hover:bg-emerald-800 rounded-full w-8 h-8"
                          onClick={() => addDishToSelection(dish)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Right Panel: Selected Items & Price Calculator */}
            <div className="bg-[#F5F5F5] p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-4">Your Selected Menu</h3>
              
              <div className="min-h-[200px] mb-6">
                {selectedDishes.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your menu is empty. Add items from the menu.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedDishes.map(dish => (
                      <div key={dish.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                        <div>
                          <h4 className="font-medium">{dish.name}</h4>
                          <p className="text-sm text-gray-500">₹{dish.price} × {dish.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">₹{(parseFloat(dish.price) * dish.quantity).toFixed(2)}</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 p-0"
                              onClick={() => updateDishQuantity(dish.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-2">{dish.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 p-0"
                              onClick={() => updateDishQuantity(dish.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => removeDish(dish.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>₹{calculatedPrices.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Service Charge (10%):</span>
                  <span>₹{serviceCharge.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">GST (5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 mt-2">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  <span>Per person cost: </span>
                  <span>₹{perPersonCost.toFixed(2)}</span>
                </div>
              </div>
              
              {selectedDishes.length > 0 && (
                <div className="mt-6">
                  <Button 
                    type="button"
                    className="w-full bg-orange-700 hover:bg-orange-800"
                    onClick={() => {
                      const bookingSection = document.getElementById('booking-form');
                      if (bookingSection) {
                        bookingSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Proceed to Booking
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      {selectedDishes.length > 0 && (
        <section id="booking-form" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-8 text-center">Complete Your Booking</h2>
              
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          {...form.register('name')} 
                          className="mt-1" 
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          {...form.register('email')} 
                          className="mt-1" 
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        {...form.register('phone')} 
                        className="mt-1" 
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{form.formState.errors.phone.message}</p>
                      )}
                    </div>

                    <div className="mb-6">
                      <Label htmlFor="message">Additional Requirements</Label>
                      <Textarea 
                        id="message" 
                        {...form.register('message')} 
                        className="mt-1" 
                        placeholder="Any specific requirements or notes for your event..."
                        rows={4}
                      />
                    </div>

                    <div className="mb-6">
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <h4 className="font-medium flex items-center text-emerald-800 mb-2">
                          <ShoppingCart className="mr-2 h-4 w-4" /> 
                          Booking Summary
                        </h4>
                        <div className="text-sm text-gray-600">
                          <p><strong>Event Type:</strong> {form.watch('eventType')}</p>
                          <p><strong>Date:</strong> {form.watch('eventDate')}</p>
                          <p><strong>Guests:</strong> {form.watch('guestCount')}</p>
                          <p><strong>Selected Dishes:</strong> {selectedDishes.length}</p>
                          <p><strong>Total Amount:</strong> ₹{total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-700 hover:bg-emerald-800"
                      disabled={createBookingMutation.isPending}
                    >
                      {createBookingMutation.isPending ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        'Submit Booking Request'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}
      
      {/* Key Features Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-4">Why Choose Our Catering Service</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">We provide a complete catering experience customized to your needs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Professional Staff</h3>
              <p className="text-gray-600">Our trained serving staff ensures smooth and efficient service throughout your event.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Customized Menus</h3>
              <p className="text-gray-600">Create your perfect menu by selecting dishes from various cuisines to suit your preferences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">We prioritize fresh ingredients and authentic flavors for a delightful culinary experience.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MenuBuilder;
