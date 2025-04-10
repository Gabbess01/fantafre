
import { Button } from "@/components/ui/button";
import { Star, Users, ArrowRight, Trophy, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/StatsCard";
import { getGlobalStats } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock auth state - in a real app, this would come from your auth provider
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo purposes
  const [user, setUser] = useState({
    username: "GiocatoreFre",
    avatar: "/placeholder.svg",
    teamName: "Squadra Pro",
    stats: {
      pali: 42,
      conquiste: 15,
      tentativi: 57,
    }
  });

  return {
    isAuthenticated,
    user,
    logout: () => setIsAuthenticated(false),
  };
};

import { useState } from "react";

const Home = () => {
  const globalStats = getGlobalStats();
  const successRate = globalStats.totalTentativi > 0 
    ? Math.round((globalStats.totalConquiste / globalStats.totalTentativi) * 100) 
    : 0;
  
  const { isAuthenticated, user } = useAuth();
  const userSuccessRate = user?.stats?.tentativi > 0 
    ? Math.round((user.stats.conquiste / user.stats.tentativi) * 100) 
    : 0;

  // Mock recent activities
  const recentActivities = [
    { id: 1, type: 'palo', user: 'MarcoR', points: 5, date: '2025-04-08' },
    { id: 2, type: 'conquista', user: 'LucaF', points: 10, date: '2025-04-07' },
    { id: 3, type: 'palo', user: 'GiovanniT', points: 5, date: '2025-04-06' },
  ];
  
  return (
    <>
      {isAuthenticated ? (
        // Logged in user view
        <>
          <section className="relative pt-24 pb-12 md:pt-32 md:pb-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-3xl font-bold">Bentornato, {user.username}!</h1>
                  </div>
                  
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Il tuo andamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatsCard
                          title="Tuoi Pali"
                          value={user.stats.pali}
                          description="Il tuo score personale"
                          icon={<Star className="w-5 h-5" />}
                          trend={{ value: 3, isPositive: true }}
                        />
                        <StatsCard
                          title="Tue Conquiste"
                          value={user.stats.conquiste}
                          description="Quando sei stato bravo"
                          icon={<Trophy className="w-5 h-5" />}
                          trend={{ value: 2, isPositive: true }}
                        />
                        <StatsCard
                          title="Percentuale Successo"
                          value={`${userSuccessRate}%`}
                          description={`Su ${user.stats.tentativi} tentativi`}
                          icon={<Users className="w-5 h-5" />}
                          trend={{ value: 5, isPositive: userSuccessRate > 30 }}
                        />
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button asChild variant="outline" size="sm">
                          <Link to="/profile" className="flex items-center gap-1">
                            Vedi statistiche complete
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Attività recenti</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map(activity => (
                          <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                activity.type === 'palo' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                              }`}>
                                {activity.type === 'palo' ? (
                                  <Star className="w-4 h-4" />
                                ) : (
                                  <Trophy className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{activity.user} ha registrato un {activity.type}</p>
                                <p className="text-sm text-muted-foreground">+{activity.points} punti</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {activity.date}
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-center mt-2">
                          <Button variant="link" size="sm" asChild>
                            <Link to="/leaderboard">Vedi tutte le attività</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex-1 max-w-md self-start">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Classifica globale</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-semibold text-lg">#1</span>
                          <span>FantaTeamPro</span>
                          <span className="font-bold">245 pt</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-semibold text-lg">#2</span>
                          <span>I Pallisti</span>
                          <span className="font-bold">183 pt</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                          <span className="font-semibold text-lg">#3</span>
                          <span>Team Fregna</span>
                          <span className="font-bold">157 pt</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2 bg-fregna-primary/10 px-2 rounded">
                          <span className="font-semibold text-lg">#5</span>
                          <span>Squadra Pro</span>
                          <span className="font-bold">128 pt</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mt-6">
                        <Button asChild>
                          <Link to="/leaderboard" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
                            Vai alla classifica completa
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        // Non-logged in user view
        <>
          <section className="relative pt-24 pb-12 md:pt-32 md:pb-20">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text animate-float">
                    FantaFre
                  </h1>
                  <p className="text-xl md:text-2xl mb-6 text-muted-foreground">
                    Il primo fanta delle non conquiste amorore.
                    Scala la classifica e diventa il re delle pali!
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button size="lg" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary" asChild>
                      <Link to="/create-player">
                        Inizia ora
                      </Link>
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

          <section className="py-12 bg-gradient-to-r from-fregna-primary/10 to-fregna-secondary/10">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-4 gradient-text">
                Entra nella competizione
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-muted-foreground">
                Unisciti a FantaFre oggi stesso e inizia a scalare la classifica.
                Conquista il podio e diventa una leggenda!
              </p>
              <Button size="lg" className="bg-gradient-to-r from-fregna-primary to-fregna-secondary" asChild>
                <Link to="/create-player">
                  Registrati ora
                </Link>
              </Button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
