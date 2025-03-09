import { useAuth } from '@/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogIn, LogOut, User, Settings } from 'lucide-react';
import { Link } from 'wouter';
import React from 'react';
import { useAuth as useAuthHook } from '@/hooks/useAuth';
import { useLocation } from 'wouter';

export const AuthButton: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthHook();
  const [, navigate] = useLocation();

  const handleLoginClick = () => {
    navigate('/admin/login');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <Button 
        variant="ghost"
        onClick={handleLoginClick}
        className="text-gray-800 hover:text-emerald-700"
      >
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{user?.username?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{user?.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.role === 'admin' && (
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">
              <User className="mr-2 h-4 w-4" />
              <span>Admin Dashboard</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};