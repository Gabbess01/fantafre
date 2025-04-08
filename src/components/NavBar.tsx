
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-fregna-primary" />
          <span className="text-xl font-bold gradient-text">FantaFregna</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-fregna-primary transition-colors">Home</Link>
          <Link to="/leaderboard" className="text-foreground hover:text-fregna-primary transition-colors">Classifica</Link>
          <Link to="/players" className="text-foreground hover:text-fregna-primary transition-colors">Giocatori</Link>
          <Link to="/rules" className="text-foreground hover:text-fregna-primary transition-colors">Regolamento</Link>
        </div>
        
        <div className="hidden md:block">
          <Button variant="default" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
            Accedi
          </Button>
        </div>
        
        <button 
          className="md:hidden focus:outline-none" 
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
              to="/leaderboard" 
              className="py-2 text-foreground hover:text-fregna-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Classifica
            </Link>
            <Link 
              to="/players" 
              className="py-2 text-foreground hover:text-fregna-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Giocatori
            </Link>
            <Link 
              to="/rules" 
              className="py-2 text-foreground hover:text-fregna-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Regolamento
            </Link>
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-fregna-primary to-fregna-secondary w-full mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accedi
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
