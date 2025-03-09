
import { useAuth } from '@/providers/AuthProvider';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { CheckIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const preferencesFormSchema = z.object({
  theme: z.enum(['light', 'dark']),
  dietaryRestrictions: z.array(z.string()),
  emailNotifications: z.boolean(),
});

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>;

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'nut-free', label: 'Nut-Free' },
];

export default function SettingsPage() {
  const { user, isLoading, isAuthenticated, updatePreferences } = useAuth();
  const [, setLocation] = useLocation();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      theme: user?.preferences?.theme || 'light',
      dietaryRestrictions: user?.preferences?.dietaryRestrictions || [],
      emailNotifications: user?.preferences?.emailNotifications ?? true,
    },
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation('/');
    }
  }, [isLoading, isAuthenticated, setLocation]);

  useEffect(() => {
    if (user?.preferences) {
      form.reset({
        theme: user.preferences.theme || 'light',
        dietaryRestrictions: user.preferences.dietaryRestrictions || [],
        emailNotifications: user.preferences.emailNotifications ?? true,
      });
    }
  }, [user, form]);

  const onSubmit = async (data: PreferencesFormValues) => {
    try {
      setIsSaving(true);
      await updatePreferences({
        ...user?.preferences,
        ...data,
      });
      toast.success('Preferences updated successfully', {
        icon: <CheckIcon className="h-4 w-4" />,
      });
    } catch (error) {
      toast.error('Failed to update preferences');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Tabs defaultValue="preferences">
        <TabsList className="mb-6">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Manage your theme and dietary preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel>Theme Preference</FormLabel>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="light"
                                value="light"
                                checked={field.value === 'light'}
                                onChange={() => field.onChange('light')}
                                className="hidden peer"
                              />
                              <label
                                htmlFor="light"
                                className="flex flex-col items-center justify-between p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                              >
                                <div className="w-full h-20 bg-white border rounded-md mb-2"></div>
                                <div>Light</div>
                              </label>
                            </div>
                          </FormControl>
                          
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                id="dark"
                                value="dark"
                                checked={field.value === 'dark'}
                                onChange={() => field.onChange('dark')}
                                className="hidden peer"
                              />
                              <label
                                htmlFor="dark"
                                className="flex flex-col items-center justify-between p-4 border rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5"
                              >
                                <div className="w-full h-20 bg-gray-800 border rounded-md mb-2"></div>
                                <div>Dark</div>
                              </label>
                            </div>
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="dietaryRestrictions"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Dietary Restrictions</FormLabel>
                          <FormDescription>
                            Select any dietary restrictions that apply to you
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {dietaryOptions.map((option) => (
                            <FormField
                              key={option.id}
                              control={form.control}
                              name="dietaryRestrictions"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={option.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(option.id)}
                                        onCheckedChange={(checked) => {
                                          const current = field.value || [];
                                          return checked
                                            ? field.onChange([...current, option.id])
                                            : field.onChange(
                                                current.filter((value) => value !== option.id)
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email updates about your orders and promotions
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View your account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Username</div>
                  <div className="col-span-2">{user.username}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Display Name</div>
                  <div className="col-span-2">{user.displayName}</div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="font-medium">Account Type</div>
                  <div className="col-span-2">Replit User</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
