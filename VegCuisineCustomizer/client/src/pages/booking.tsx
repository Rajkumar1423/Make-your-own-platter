
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  time: z.string().min(1, { message: 'Time is required' }),
  guests: z.string().min(1, { message: 'Number of guests is required' }),
  eventType: z.string().min(1, { message: 'Event type is required' }),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const Booking: FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log('Form submitted:', data);
    // Here you would typically send the data to your server
    toast.success('Booking request submitted! We will contact you shortly.');
    reset();
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-4">Book Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">Fill out the form below to schedule a consultation or book our catering services for your upcoming event.</p>
        </div>
      </section>
      
      {/* Booking Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-emerald-700 p-8 text-white hidden md:block">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Why Choose Us</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Customized Menus</h3>
                  <p className="text-emerald-100">Tailor your menu to suit your specific event requirements and guest preferences.</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Fresh Ingredients</h3>
                  <p className="text-emerald-100">We use only the freshest, high-quality ingredients for all our dishes.</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Professional Service</h3>
                  <p className="text-emerald-100">Our experienced team ensures seamless execution of your event.</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Diverse Cuisine Options</h3>
                  <p className="text-emerald-100">Choose from a wide range of cuisine styles to create the perfect dining experience.</p>
                </div>
              </div>
              
              <div className="p-8">
                <h2 className="font-['Playfair_Display'] text-2xl font-bold mb-6">Book Your Event</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      {...register('name')} 
                      placeholder="Your full name" 
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        {...register('email')} 
                        placeholder="Your email" 
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        {...register('phone')} 
                        placeholder="Your phone number" 
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Event Date</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        {...register('date')} 
                        className={errors.date ? "border-red-500" : ""}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Event Time</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        {...register('time')} 
                        className={errors.time ? "border-red-500" : ""}
                      />
                      {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input 
                        id="guests" 
                        type="number" 
                        {...register('guests')} 
                        placeholder="Estimated number of guests" 
                        className={errors.guests ? "border-red-500" : ""}
                      />
                      {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="eventType">Event Type</Label>
                      <select 
                        id="eventType" 
                        {...register('eventType')} 
                        className={`w-full border rounded-md py-2 px-3 ${errors.eventType ? "border-red-500" : "border-gray-300"}`}
                      >
                        <option value="">Select event type</option>
                        <option value="wedding">Wedding</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="birthday">Birthday</option>
                        <option value="anniversary">Anniversary</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Additional Information</Label>
                    <textarea 
                      id="message" 
                      {...register('message')} 
                      rows={4} 
                      className="w-full border border-gray-300 rounded-md py-2 px-3"
                      placeholder="Please provide any additional details about your event"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800">
                    Submit Booking Request
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <h2 className="font-['Playfair_Display'] text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">How far in advance should I book?</h3>
              <p className="text-gray-600">We recommend booking at least 2-3 weeks in advance for smaller events and 1-2 months for larger events like weddings to ensure availability. For peak seasons, earlier booking is advisable.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Do you accommodate dietary restrictions?</h3>
              <p className="text-gray-600">Yes, we specialize in vegetarian cuisine and can accommodate various dietary restrictions including vegan, gluten-free, and allergies. Please mention your specific requirements when booking.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">What is included in your catering package?</h3>
              <p className="text-gray-600">Our standard packages include food preparation, delivery, setup, and service staff if required. Additional services like tableware, decorations, and cleanup can be arranged at an extra cost.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-2">Do you offer tastings before booking?</h3>
              <p className="text-gray-600">Yes, we offer tasting sessions for events above a certain size. There may be a nominal fee for tastings, which is adjusted in your final bill if you proceed with booking.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
