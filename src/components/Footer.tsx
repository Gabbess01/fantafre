
import { Trophy, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Trophy className="h-5 w-5 text-fregna-primary" />
            <span className="text-lg font-bold gradient-text">FantaFregna</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FantaFregna. Tutti i diritti riservati.
          </div>
          
          <div className="flex items-center gap-1 mt-4 md:mt-0 text-sm text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-fregna-primary" /> in Italia
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
