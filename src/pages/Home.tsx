
import { Button } from "@/components/ui/button";
import { Star, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/StatsCard";
import { getGlobalStats } from "@/data/mockData";
import CreatePlayerForm from "@/components/CreatePlayerForm";

const Home = () => {
  const globalStats = getGlobalStats();
  const successRate = globalStats.totalTentativi > 0 
    ? Math.round((globalStats.totalConquiste / globalStats.totalTentativi) * 100) 
    : 0;
  
  return (
    <>
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text animate-float">
                FantaFregna
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-muted-foreground">
                Il primo fantacalcio delle conquiste amorose.
                Scala la classifica e diventa il Re delle Relazioni!
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
                  Inizia ora
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/rules">
                    Scopri le regole
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-20 h-20 bg-fregna-primary/10 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-fregna-secondary/10 rounded-full animate-pulse-gentle" />
                <div className="relative glassmorphism p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur">
                  <img 
                    src="/placeholder.svg" 
                    alt="FantaFregna dashboard preview" 
                    className="w-full rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
            Statistiche globali
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Totale Pali"
              value={globalStats.totalPali}
              description="Il totale dei pali presi da tutti i giocatori"
              icon={<Star className="w-5 h-5" />}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Conquiste riuscite"
              value={globalStats.totalConquiste}
              description="Il totale delle conquiste riuscite"
              icon={<Star className="w-5 h-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Percentuale di successo"
              value={`${successRate}%`}
              description={`Su ${globalStats.totalTentativi} tentativi totali`}
              icon={<Users className="w-5 h-5" />}
              trend={{ value: 5, isPositive: successRate > 30 }}
            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <CreatePlayerForm />
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-fregna-primary/10 to-fregna-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Entra nella competizione
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
            Unisciti a FantaFregna oggi stesso e inizia a scalare la classifica.
            Conquista il podio e diventa una leggenda!
          </p>
          <Button size="lg" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
            Registrati ora
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
