
"use client"; 
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';
import { Menu, X, UserCircle, CalendarDays, Search, LogIn, UserPlus, LogOutIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const baseNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/doctors', label: 'Find Doctors' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole');
    setIsLoggedIn(loggedInStatus);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserRole(null);
    router.push('/'); // Redirect to home page after logout
  };

  const getDashboardLink = () => {
    if (userRole === 'doctor') {
      return '/doctor/dashboard';
    }
    if (userRole === 'patient') {
      return '/patient/dashboard';
    }
    return '/login'; // Fallback if role not set or unknown
  };
  
  const navLinks = [
    ...baseNavLinks,
    ...(isLoggedIn ? [{ href: getDashboardLink(), label: 'My Dashboard' }] : [])
  ];


  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-foreground hover:text-primary transition-colors ${
                pathname === link.href ? 'text-primary font-semibold' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href={getDashboardLink()}>
                  <UserCircle className="h-6 w-6 text-primary" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout} className="text-primary border-primary hover:bg-primary/10">
                <LogOutIcon className="mr-2 h-5 w-5" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-primary hover:bg-primary/10">
                <Link href="/login">
                  <LogIn className="mr-2 h-5 w-5" /> Login
                </Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/register">
                  <UserPlus className="mr-2 h-5 w-5" /> Register
                </Link>
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7 text-primary" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-card p-6">
              <div className="flex flex-col space-y-6">
              <div className="flex justify-between items-center mb-6">
                <Logo />
                <SheetClose asChild>
                   <Button variant="ghost" size="icon">
                      <X className="h-6 w-6 text-primary" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                </SheetClose>
              </div>
                {navLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={`block text-lg font-medium text-foreground hover:text-primary transition-colors ${
                        pathname === link.href ? 'text-primary' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <hr className="border-border my-4" />
                {isLoggedIn ? (
                  <>
                     <SheetClose asChild>
                      <Link href={getDashboardLink()} className="flex items-center text-lg font-medium text-foreground hover:text-primary transition-colors">
                        <UserCircle className="mr-2 h-5 w-5" /> Profile
                      </Link>
                    </SheetClose>
                    <Button variant="outline" onClick={handleLogout} className="w-full text-primary border-primary hover:bg-primary/10">
                      <LogOutIcon className="mr-2 h-5 w-5" /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button variant="ghost" asChild className="w-full justify-start text-lg text-primary hover:bg-primary/10">
                        <Link href="/login"><LogIn className="mr-2 h-5 w-5" />Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg">
                        <Link href="/register"><UserPlus className="mr-2 h-5 w-5" />Register</Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
