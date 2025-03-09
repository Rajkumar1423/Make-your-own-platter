
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const fetchAdminData = async (endpoint: string, token: string) => {
  const response = await fetch(`/api/admin/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return response.json();
};

export default function AdminDashboard() {
  const { user, token, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      setLocation('/admin/login');
    }
  }, [isAuthenticated, user]);

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => fetchAdminData('users', token || ''),
    enabled: !!token && isAuthenticated && user?.role === 'admin',
  });

  const { data: bookings, isLoading: isBookingsLoading } = useQuery({
    queryKey: ['admin', 'bookings'],
    queryFn: () => fetchAdminData('bookings', token || ''),
    enabled: !!token && isAuthenticated && user?.role === 'admin',
  });

  const { data: contacts, isLoading: isContactsLoading } = useQuery({
    queryKey: ['admin', 'contacts'],
    queryFn: () => fetchAdminData('contacts', token || ''),
    enabled: !!token && isAuthenticated && user?.role === 'admin',
  });

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Registered users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {isUsersLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : users?.length || 0}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Bookings</CardTitle>
                <CardDescription>All booking requests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {isBookingsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : bookings?.length || 0}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Customer inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {isContactsLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : contacts?.length || 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage system users</CardDescription>
            </CardHeader>
            <CardContent>
              {isUsersLoading ? (
                <div className="flex justify-center p-6">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Username</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Role</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.length ? (
                        users.map((user: any) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.username}</td>
                            <td className="p-2">{user.name || '-'}</td>
                            <td className="p-2">{user.email || '-'}</td>
                            <td className="p-2">{user.role}</td>
                            <td className="p-2">
                              <Button variant="outline" size="sm">Edit</Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center p-4">No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>View and manage customer bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {isBookingsLoading ? (
                <div className="flex justify-center p-6">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Customer</th>
                        <th className="text-left p-2">Event Type</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Guests</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.length ? (
                        bookings.map((booking: any) => (
                          <tr key={booking.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{booking.id}</td>
                            <td className="p-2">{booking.name}</td>
                            <td className="p-2">{booking.eventType}</td>
                            <td className="p-2">{booking.eventDate}</td>
                            <td className="p-2">{booking.guestCount}</td>
                            <td className="p-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'canceled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">View</Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="bg-green-50 text-green-700 hover:bg-green-100"
                                >
                                  Confirm
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center p-4">No bookings found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>View customer inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              {isContactsLoading ? (
                <div className="flex justify-center p-6">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">ID</th>
                        <th className="text-left p-2">Name</th>
                        <th className="text-left p-2">Email</th>
                        <th className="text-left p-2">Subject</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts?.length ? (
                        contacts.map((contact: any) => (
                          <tr key={contact.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{contact.id}</td>
                            <td className="p-2">{contact.name}</td>
                            <td className="p-2">{contact.email}</td>
                            <td className="p-2">{contact.subject}</td>
                            <td className="p-2">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                contact.isRead ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {contact.isRead ? 'Read' : 'Unread'}
                              </span>
                            </td>
                            <td className="p-2">
                              <Button variant="outline" size="sm">View</Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center p-4">No contact messages found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
