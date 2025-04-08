import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { 
  Trophy, Users, Settings, LogOut, User, Award, 
  TrendingUp, Calendar, BarChart3, UserPlus 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface TeamPlayer {
  id: number;
  name: string;
  avatar: string;
  position: string;
  rating: number;
  stats: {
    pali: number;
    conquiste: number;
    tentativi: number;
  };
}

interface TeamData {
  name: string;
  formation: string;
  players: TeamPlayer[];
}

const TeamDashboard = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const [team, setTeam] = useState<TeamData | null>(null);
  
  // Get team data from location state or generate mock data
  useEffect(() => {
    if (location.state?.team) {
      setTeam(location.state.team);
    } else {
      // Mock data for demonstration purposes
      const mockTeam: TeamData = {
        name: location.state?.teamName || "Squadra Fantasy",
        formation: location.state?.formation || "4-3-3",
        players: [
          {
            id: 1,
            name: "Marco",
            avatar: "/placeholder.svg",
            position: "attaccante",
            rating: 82,
            stats: { pali: 5, conquiste: 3, tentativi: 12 }
          },
          {
            id: 2,
            name: "Luca",
            avatar: "/placeholder.svg",
            position: "centrocampista",
            rating: 75,
            stats: { pali: 3, conquiste: 2, tentativi: 8 }
          },
          // Add more mock players if needed
        ]
      };
      setTeam(mockTeam);
    }
  }, [location.state]);
  
  const copyInviteLink = () => {
    const inviteLink = `https://fantafregna.com/join/${teamId || "team-" + Math.random().toString(36).substring(2, 8)}`;
    navigator.clipboard.writeText(inviteLink);
    toast.success("Link copiato negli appunti!");
  };

  if (!team) return <div className="flex items-center justify-center h-screen">Caricamento...</div>;
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader className="relative p-0">
              <div className="h-24 bg-gradient-to-r from-fregna-primary to-fregna-secondary" />
              <div className="absolute -bottom-12 left-4">
                <Avatar className="w-24 h-24 border-4 border-background">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-muted">
                    <Users className="w-12 h-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </div>
            </CardHeader>
            <CardContent className="pt-14 pb-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{team.name}</h2>
                  <p className="text-muted-foreground">Modulo: {team.formation}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Giocatori</span>
                  <Badge variant="outline">{team.players.length}</Badge>
                </div>
                
                <Button onClick={copyInviteLink} variant="outline" className="w-full">
                  Condividi Link di Invito
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Il Tuo Giocatore</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>UT</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{location.state?.playerName || "Utente"}</p>
                  <p className="text-sm text-muted-foreground capitalize">{location.state?.role || "attaccante"}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Pali</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Conquiste</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tentativi</span>
                  <span className="font-medium">0</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <nav>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-2 h-5 w-5" />
                Squadra
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trophy className="mr-2 h-5 w-5" />
                Classifica
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BarChart3 className="mr-2 h-5 w-5" />
                Statistiche
              </Button>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-5 w-5" />
                Impostazioni
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{team.name}</CardTitle>
              <CardDescription>Formazione {team.formation}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-[2/3] bg-gradient-to-b from-green-600/40 to-green-700/60 rounded-lg overflow-hidden">
                {/* Pitch markings */}
                <div className="absolute inset-0">
                  <div className="absolute top-1/2 left-0 right-0 border-t-2 border-white/30 transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Player positions based on formation */}
                <div className="absolute inset-0 grid grid-rows-4 p-4">
                  {/* Attackers row */}
                  <div className="relative grid grid-cols-3 items-center justify-items-center">
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-fregna-primary text-white">A</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-fregna-primary text-white">A</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-fregna-primary text-white">A</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  {/* Midfielders row */}
                  <div className="relative grid grid-cols-3 items-center justify-items-center">
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-fregna-secondary text-white">C</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-fregna-secondary text-white">C</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-fregna-secondary text-white">C</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  {/* Defenders row */}
                  <div className="relative grid grid-cols-4 items-center justify-items-center">
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-blue-500 text-white">D</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-blue-500 text-white">D</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-blue-500 text-white">D</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-blue-500 text-white">D</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  
                  {/* Goalkeeper row */}
                  <div className="relative grid grid-cols-1 items-center justify-items-center">
                    <div className="player-position">
                      <Avatar className="w-12 h-12 border-2 border-white">
                        <AvatarFallback className="bg-yellow-500 text-white">P</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Button className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Aggiungi Giocatore
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="squadra">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="squadra">Squadra</TabsTrigger>
              <TabsTrigger value="classifica">Classifica</TabsTrigger>
              <TabsTrigger value="statistiche">Statistiche</TabsTrigger>
            </TabsList>
            
            <TabsContent value="squadra">
              <Card>
                <CardHeader>
                  <CardTitle>Giocatori della Squadra</CardTitle>
                  <CardDescription>Lista dei giocatori attualmente in squadra</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {team.players.length > 0 ? (
                      team.players.map(player => (
                        <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={player.avatar} />
                              <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{player.name}</p>
                              <p className="text-sm text-muted-foreground capitalize">{player.position}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="flex items-center space-x-1">
                              <Award className="h-3.5 w-3.5" />
                              <span>{player.rating}</span>
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <Users className="mx-auto h-12 w-12 opacity-20" />
                        <p className="mt-2">Non ci sono ancora giocatori nella squadra</p>
                        <Button variant="outline" className="mt-4">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Invita Giocatori
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="classifica">
              <Card>
                <CardHeader>
                  <CardTitle>Classifica Giocatori</CardTitle>
                  <CardDescription>Performance dei giocatori della tua squadra</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {team.players.length > 0 ? (
                      team.players
                        .sort((a, b) => b.rating - a.rating)
                        .map((player, index) => (
                          <div key={player.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 text-center font-medium">
                                {index === 0 ? (
                                  <Trophy className="h-5 w-5 text-yellow-500" />
                                ) : (
                                  index + 1
                                )}
                              </div>
                              <Avatar>
                                <AvatarImage src={player.avatar} />
                                <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{player.name}</p>
                                <p className="text-sm text-muted-foreground capitalize">{player.position}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="text-sm text-right">
                                <div className="font-medium">{player.stats.conquiste} Conquiste</div>
                                <div className="text-muted-foreground">{player.stats.pali} Pali</div>
                              </div>
                              <Badge className="bg-gradient-to-r from-fregna-primary to-fregna-secondary">
                                {player.rating}
                              </Badge>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Trophy className="mx-auto h-12 w-12 opacity-20" />
                        <p className="mt-2">Classifica non disponibile</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="statistiche">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiche della Squadra</CardTitle>
                  <CardDescription>Panoramica delle performance della squadra</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Totale Pali</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {team.players.reduce((sum, player) => sum + player.stats.pali, 0)}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Totale Conquiste</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {team.players.reduce((sum, player) => sum + player.stats.conquiste, 0)}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Percentuale Successo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {
                            (() => {
                              const totalTentativi = team.players.reduce((sum, player) => sum + player.stats.tentativi, 0);
                              const totalConquiste = team.players.reduce((sum, player) => sum + player.stats.conquiste, 0);
                              return totalTentativi > 0 ? Math.round((totalConquiste / totalTentativi) * 100) : 0;
                            })()
                          }%
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Classifica Giocatori</CardTitle>
              <CardDescription>Top 5 giocatori della lega</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 text-center font-medium">
                        {i === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                        {i === 2 && <Trophy className="h-4 w-4 text-gray-400" />}
                        {i === 3 && <Trophy className="h-4 w-4 text-amber-700" />}
                        {i > 3 && i}
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {String.fromCharCode(64 + i)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-sm font-medium">Giocatore {i}</div>
                    </div>
                    <Badge variant="outline">
                      {85 - (i * 3)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Giocatore del Mese</CardTitle>
              <CardDescription>Top performer di questo mese</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xl">GM</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Gianni Morandi</h3>
                <p className="text-muted-foreground">Attaccante • 6 conquiste</p>
                <div className="flex items-center mt-2">
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-bold">MVP</span>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Visualizza Profilo
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-muted/40">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Prossimi Eventi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-colors">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Serata in discoteca</p>
                    <p className="text-xs text-muted-foreground">Sabato 12 Aprile</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-colors">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Aperitivo di squadra</p>
                    <p className="text-xs text-muted-foreground">Martedì 22 Aprile</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;
