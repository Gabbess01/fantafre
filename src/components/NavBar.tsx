
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from 'next-themes';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-fregna-primary" />
          <span className="text-xl font-bold gradient-text">FantaFregna</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-fregna-primary transition-colors">Home</Link>
          <Link to="/create-player" className="text-foreground hover:text-fregna-primary transition-colors">Crea Giocatore</Link>
          <Link to="/rules" className="text-foreground hover:text-fregna-primary transition-colors">Regolamento</Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="hidden md:block">
          <Link to="/login">
            <Button variant="default" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
              Accedi
            </Button>
          </Link>
        </div>
        
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <button 
            className="focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-2 flex flex-col gap-2">
            <Link 
              to="/" 
              className="py-2 text-foreground hover:text-fregna-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/create-player" 
              className="py-2 text-foreground hover:text-fregna-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Crea Giocatore
            </Link>
            <Link 
              to="/rules" 
              className="py-2 text-foreground hover:text-fregna-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Regolamento
            </Link>
            <Link to="/login">
              <Button 
                variant="default" 
                className="bg-gradient-to-r from-fregna-primary to-fregna-secondary w-full mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accedi
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
