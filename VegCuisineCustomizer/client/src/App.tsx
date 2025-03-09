import { Switch, Route } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import MainLayout from './components/layouts/MainLayout';
import Home from './pages/home';
import About from './pages/about';
import Cuisines from './pages/cuisines';
import CuisineDetails from './pages/cuisine-details';
import Dishes from './pages/dishes';
import DishDetails from './pages/dish-details';
import Contact from './pages/contact';
import MenuBuilder from './pages/menu-builder';
import Services from './pages/services';
import Booking from './pages/booking';

// Admin pages
import AdminLogin from './pages/admin/login';
import AdminDashboard from './pages/admin/dashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <Switch>
        {/* Admin routes without main layout */}
        <Route path="/admin/login" component={AdminLogin} />

        {/* Admin routes with main layout */}
        <Route path="/admin/dashboard">
          <MainLayout>
            <AdminDashboard />
          </MainLayout>
        </Route>

        {/* Main routes */}
        <Route path="/">
          <MainLayout>
            <Switch>
              <Route path="/" component={Home} />
              
              <Route path="/cuisines" component={Cuisines} />
              <Route path="/cuisines/:id" component={CuisineDetails} />
              <Route path="/dishes" component={Dishes} />
              <Route path="/dishes/:id" component={DishDetails} />
              <Route path="/contact" component={Contact} />
              <Route path="/menu-builder" component={MenuBuilder} />
              <Route path="/services" component={Services} />
              <Route path="/booking" component={Booking} />
            </Switch>
          </MainLayout>
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;