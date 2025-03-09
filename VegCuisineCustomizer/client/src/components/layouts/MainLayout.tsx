import { FC, ReactNode, useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, MenuIcon, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AuthButton } from '@/components/auth/AuthButton';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink: FC<NavLinkProps> = ({ href, children, className = '', onClick }) => {
  const [location] = useLocation();
  const isActive = location === href;

  return (
    <Link href={href}>
      <a 
        onClick={onClick}
        className={`font-medium transition-colors hover:text-emerald-700 ${isActive ? 'text-emerald-700' : 'text-gray-800'} ${className}`}
      >
        {children}
      </a>
    </Link>
  );
};

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="font-['Open_Sans'] min-h-screen flex flex-col bg-[#FFFAF0]">
      {/* Header */}
      <header className={`sticky top-0 z-50 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95'} transition-all duration-300`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center">
              <div className="font-['Playfair_Display'] font-bold text-2xl text-emerald-700">Make Your Own</div>
              <span className="ml-2 font-['Poppins'] text-sm text-orange-700">Platter</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/cuisines">Cuisines</NavLink>
            <NavLink href="/menu-builder">Build Menu</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/admin/dashboard">Admin</NavLink> {/* Added Admin link */}
            <AuthButton /> {/* Added AuthButton here */}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <NavLink href="/" onClick={closeMobileMenu}>Home</NavLink>
                <NavLink href="/services" onClick={closeMobileMenu}>Services</NavLink>
                <NavLink href="/cuisines" onClick={closeMobileMenu}>Cuisines</NavLink>
                <NavLink href="/menu-builder" onClick={closeMobileMenu}>Build Menu</NavLink>
                <NavLink href="/contact" onClick={closeMobileMenu}>Contact</NavLink>
                <NavLink href="/admin/dashboard" onClick={closeMobileMenu}>Admin</NavLink> {/* Added Admin link */}
                <AuthButton /> {/* Added AuthButton here */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="font-['Playfair_Display'] font-bold text-2xl text-white">Make Your Own</div>
                <span className="ml-2 font-['Poppins'] text-sm text-amber-400">Platter</span>
              </div>
              <p className="text-gray-200 mb-4">Providing customizable pure vegetarian catering services for all your special events.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-amber-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 h-5 fill-current">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 fill-current">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                    <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-amber-400 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-5 h-5 fill-current">
                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/"><a className="text-gray-200 hover:text-white transition">Home</a></Link></li>
                <li><Link href="/services"><a className="text-gray-200 hover:text-white transition">Services</a></Link></li>
                <li><Link href="/cuisines"><a className="text-gray-200 hover:text-white transition">Cuisines</a></Link></li>
                <li><Link href="/menu-builder"><a className="text-gray-200 hover:text-white transition">Menu Builder</a></Link></li>
                <li><Link href="/contact"><a className="text-gray-200 hover:text-white transition">Contact</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2">
                <li><Link href="/services"><a className="text-gray-200 hover:text-white transition">Wedding Catering</a></Link></li>
                <li><Link href="/services"><a className="text-gray-200 hover:text-white transition">Corporate Events</a></Link></li>
                <li><Link href="/services"><a className="text-gray-200 hover:text-white transition">Family Gatherings</a></Link></li>
                <li><Link href="/services"><a className="text-gray-200 hover:text-white transition">Birthday Parties</a></Link></li>
                <li><Link href="/services"><a className="text-gray-200 hover:text-white transition">Special Occasions</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-gray-200 mb-4">Subscribe to our newsletter for the latest updates and special offers.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="p-2 rounded-l-lg flex-grow focus:outline-none text-gray-800" />
                <Button type="submit" className="bg-orange-700 text-white rounded-l-none hover:bg-orange-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </Button>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-300">© {new Date().getFullYear()} Make Your Own Platter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;