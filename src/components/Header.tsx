import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Plane, Menu, X, User, LogOut, Ticket, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Book Flight' },
    { href: '/track', label: 'Track Booking' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === '/';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled || !isHomePage
          ? "bg-card/95 backdrop-blur-xl border-b border-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg",
              isScrolled || !isHomePage 
                ? "bg-gradient-to-br from-primary to-accent" 
                : "bg-white/20 backdrop-blur-md"
            )}>
              <Plane className="w-6 h-6 text-white" />
            </div>
            <span className={cn(
              "text-2xl font-extrabold transition-colors",
              isScrolled || !isHomePage ? "text-foreground" : "text-white"
            )}>SkyWings</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : isScrolled || !isHomePage
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "gap-2 rounded-xl px-4",
                      isScrolled || !isHomePage 
                        ? "hover:bg-muted" 
                        : "text-white hover:bg-white/10"
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center",
                      isScrolled || !isHomePage ? "bg-primary/10" : "bg-white/20"
                    )}>
                      <User className={cn(
                        "w-4 h-4",
                        isScrolled || !isHomePage ? "text-primary" : "text-white"
                      )} />
                    </div>
                    <span className="text-sm font-semibold">{user.email?.split('@')[0]}</span>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 rounded-xl p-2">
                  <DropdownMenuItem onClick={() => navigate('/my-bookings')} className="rounded-lg py-3 cursor-pointer">
                    <Ticket className="w-4 h-4 mr-3" />
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-lg py-3 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant={isScrolled || !isHomePage ? "default" : "glass"} 
                onClick={() => navigate('/auth')}
                className="rounded-xl px-6 font-semibold shadow-lg"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden rounded-xl",
              isScrolled || !isHomePage ? "" : "text-white hover:bg-white/10"
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-6 border-t border-border animate-slide-up bg-card rounded-b-2xl shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "block px-5 py-4 rounded-xl text-base font-semibold transition-colors mx-2 mb-1",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-border px-4">
              {user ? (
                <>
                  <Link
                    to="/my-bookings"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 py-4 text-base font-semibold text-foreground"
                  >
                    <Ticket className="w-5 h-5" />
                    My Bookings
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-4 text-base font-semibold text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Button
                  variant="default"
                  className="w-full rounded-xl py-6 font-semibold"
                  onClick={() => {
                    navigate('/auth');
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
