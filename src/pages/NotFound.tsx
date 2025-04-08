
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-2xl font-medium mb-6">Pagina non trovata</p>
        <p className="text-muted-foreground mb-8">
          Sembra che tu abbia preso un palo anche con questa pagina...
        </p>
        <Button asChild>
          <Link to="/">Torna alla Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
