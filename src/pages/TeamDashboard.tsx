
import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { 
  Trophy, Users, Settings, LogOut, User, Award, 
  TrendingUp, Calendar, BarChart3, UserPlus, PlusCircle, ChevronsRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
  isCaptain?: boolean;
  stats: {
    pali: number;
    conquiste: number;
    tentativi: number;
  };
  fieldPosition?: string | null;
}

interface TeamData {
  name: string;
  formation: string;
  players: TeamPlayer[];
}

const TeamDashboard = () => {
  const { teamId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamData | null>(null);
  const [draggingPlayer, setDraggingPlayer] = useState<TeamPlayer | null>(null);
  const [isCurrentUserCaptain, setIsCurrentUserCaptain] = useState<boolean>(true); // For demo purposes, set to true
  
  useEffect(() => {
    if (location.state?.team) {
      setTeam(location.state.team);
    } else {
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
            isCaptain: true,
            stats: { pali: 5, conquiste: 3, tentativi: 12 },
            fieldPosition: "ST-C"
          },
          {
            id: 2,
            name: "Luca",
            avatar: "/placeholder.svg",
            position: "centrocampista",
            rating: 75,
            stats: { pali: 3, conquiste: 2, tentativi: 8 },
            fieldPosition: "CM-C"
          },
          {
            id: 3,
            name: "Andrea",
            avatar: "/placeholder.svg",
            position: "difensore",
            rating: 78,
            stats: { pali: 2, conquiste: 1, tentativi: 5 },
            fieldPosition: null
          },
          {
            id: 4,
            name: "Giovanni",
            avatar: "/placeholder.svg",
            position: "portiere",
            rating: 70,
            stats: { pali: 1, conquiste: 0, tentativi: 3 },
            fieldPosition: null
          },
          {
            id: 5,
            name: "Paolo",
            avatar: "/placeholder.svg",
            position: "attaccante",
            rating: 85,
            stats: { pali: 7, conquiste: 4, tentativi: 15 },
            fieldPosition: null
          }
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

  const handleDragStart = (player: TeamPlayer) => {
    if (!isCurrentUserCaptain) {
      toast.error("Solo il capitano può modificare la formazione");
      return;
    }
    setDraggingPlayer(player);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, position: string) => {
    e.preventDefault();
    if (!draggingPlayer || !team || !isCurrentUserCaptain) return;

    // Check if dropping on same position or if another player is already in this position
    const playerInPosition = getPlayerInPosition(position);

    const updatedPlayers = team.players.map(p => {
      if (p.id === draggingPlayer.id) {
        // If player is already in this position, don't change anything
        if (p.fieldPosition === position) {
          return p;
        }
        return { ...p, fieldPosition: position };
      }
      // If another player is in this position, swap their positions
      if (p.fieldPosition === position) {
        return { ...p, fieldPosition: draggingPlayer.fieldPosition };
      }
      return p;
    });

    setTeam({ ...team, players: updatedPlayers });
    
    if (playerInPosition) {
      toast.success(`${draggingPlayer.name} ha scambiato posizione con ${playerInPosition.name}`);
    } else {
      toast.success(`${draggingPlayer.name} impostato come ${position}`);
    }
    setDraggingPlayer(null);
  };

  const handleReturnToBench = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggingPlayer || !team || !isCurrentUserCaptain) return;

    const updatedPlayers = team.players.map(p => {
      if (p.id === draggingPlayer.id) {
        return { ...p, fieldPosition: null };
      }
      return p;
    });

    setTeam({ ...team, players: updatedPlayers });
    toast.success(`${draggingPlayer.name} rimosso dalla formazione`);
    setDraggingPlayer(null);
  };

  const getPlayerInPosition = (position: string): TeamPlayer | undefined => {
    return team?.players.find(p => p.fieldPosition === position);
  };

  const getBenchPlayers = (): TeamPlayer[] => {
    if (!team) return [];
    return team.players.filter(player => player.fieldPosition === null);
  };
  
  const viewPlayerProfile = (playerId: number) => {
    // In a real app, navigate to the player's profile page
    navigate(`/player/${playerId}`);
    toast.info("Visualizzazione profilo giocatore");
  };

  if (!team) return <div className="flex items-center justify-center h-screen">Caricamento...</div>;
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/team-events">
                  <Calendar className="mr-2 h-5 w-5" />
                  Eventi
                </Link>
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
        
        <div className="lg:col-span-6">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{team.name}</CardTitle>
                  <CardDescription>Formazione {team.formation}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-row gap-4 h-[500px]">
                <div className="flex-grow">
                  <div className="relative w-full h-full bg-gradient-to-b from-green-600/40 to-green-700/60 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="absolute top-1/2 left-0 right-0 border-t-2 border-white/30 transform -translate-y-1/2"></div>
                      <div className="absolute top-1/4 left-0 right-0 border-t border-white/20"></div>
                      <div className="absolute top-3/4 left-0 right-0 border-t border-white/20"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute left-1/4 top-0 bottom-0 border-l border-white/20"></div>
                      <div className="absolute right-1/4 top-0 bottom-0 border-l border-white/20"></div>
                      <div className="absolute left-0 right-0 bottom-5 h-16 border-b-2 border-l-2 border-r-2 border-white/30 rounded-b-xl mx-10"></div>
                    </div>
                    
                    <div className="absolute inset-0 grid grid-rows-4 p-4">
                      <div className="row-span-1 grid grid-cols-3 items-center justify-items-center">
                        {["ST-L", "ST-C", "ST-R"].map((pos) => {
                          const player = getPlayerInPosition(pos);
                          return (
                            <div 
                              key={pos}
                              className="player-position relative cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, pos)}
                              onClick={() => player && viewPlayerProfile(player.id)}
                            >
                              <Avatar className={`w-12 h-12 border-2 ${player ? 'border-yellow-400' : 'border-white/50'}`}>
                                {player ? (
                                  <>
                                    <AvatarImage src={player.avatar} alt={player.name} />
                                    <AvatarFallback className="bg-fregna-primary text-white">{player.name.substring(0, 1)}</AvatarFallback>
                                  </>
                                ) : (
                                  <AvatarFallback className="bg-fregna-primary/40 text-white">A</AvatarFallback>
                                )}
                              </Avatar>
                              {player?.isCaptain && (
                                <div className="absolute -left-3 -top-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-20 border-2 border-white">
                                  C
                                </div>
                              )}
                              {player && (
                                <Badge className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center p-0 z-10">
                                  {player.rating}
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="row-span-1 grid grid-cols-3 items-center justify-items-center">
                        {["CM-L", "CM-C", "CM-R"].map((pos) => {
                          const player = getPlayerInPosition(pos);
                          return (
                            <div 
                              key={pos}
                              className="player-position relative cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, pos)}
                              onClick={() => player && viewPlayerProfile(player.id)}
                            >
                              <Avatar className={`w-12 h-12 border-2 ${player ? 'border-yellow-400' : 'border-white/50'}`}>
                                {player ? (
                                  <>
                                    <AvatarImage src={player.avatar} alt={player.name} />
                                    <AvatarFallback className="bg-fregna-secondary text-white">{player.name.substring(0, 1)}</AvatarFallback>
                                  </>
                                ) : (
                                  <AvatarFallback className="bg-fregna-secondary/40 text-white">C</AvatarFallback>
                                )}
                              </Avatar>
                              {player?.isCaptain && (
                                <div className="absolute -left-3 -top-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-20 border-2 border-white">
                                  C
                                </div>
                              )}
                              {player && (
                                <Badge className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center p-0 z-10">
                                  {player.rating}
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="row-span-1 grid grid-cols-4 items-center justify-items-center">
                        {["DF-L", "DF-LC", "DF-RC", "DF-R"].map((pos) => {
                          const player = getPlayerInPosition(pos);
                          return (
                            <div 
                              key={pos}
                              className="player-position relative cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, pos)}
                              onClick={() => player && viewPlayerProfile(player.id)}
                            >
                              <Avatar className={`w-12 h-12 border-2 ${player ? 'border-yellow-400' : 'border-white/50'}`}>
                                {player ? (
                                  <>
                                    <AvatarImage src={player.avatar} alt={player.name} />
                                    <AvatarFallback className="bg-blue-500 text-white">{player.name.substring(0, 1)}</AvatarFallback>
                                  </>
                                ) : (
                                  <AvatarFallback className="bg-blue-500/40 text-white">D</AvatarFallback>
                                )}
                              </Avatar>
                              {player?.isCaptain && (
                                <div className="absolute -left-3 -top-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-20 border-2 border-white">
                                  C
                                </div>
                              )}
                              {player && (
                                <Badge className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center p-0 z-10">
                                  {player.rating}
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="row-span-1 flex justify-center items-center">
                        {["GK"].map((pos) => {
                          const player = getPlayerInPosition(pos);
                          return (
                            <div 
                              key={pos}
                              className="player-position relative cursor-pointer"
                              onDragOver={handleDragOver}
                              onDrop={(e) => handleDrop(e, pos)}
                              onClick={() => player && viewPlayerProfile(player.id)}
                            >
                              <Avatar className={`w-12 h-12 border-2 ${player ? 'border-yellow-400' : 'border-white/50'}`}>
                                {player ? (
                                  <>
                                    <AvatarImage src={player.avatar} alt={player.name} />
                                    <AvatarFallback className="bg-yellow-500 text-white">{player.name.substring(0, 1)}</AvatarFallback>
                                  </>
                                ) : (
                                  <AvatarFallback className="bg-yellow-500/40 text-white">P</AvatarFallback>
                                )}
                              </Avatar>
                              {player?.isCaptain && (
                                <div className="absolute -left-3 -top-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-20 border-2 border-white">
                                  C
                                </div>
                              )}
                              {player && (
                                <Badge className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center p-0 z-10">
                                  {player.rating}
                                </Badge>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-20 flex flex-col">
                  <Card className="h-full">
                    <CardHeader className="p-2 text-center">
                      <CardTitle className="text-xs">Panchina</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 h-full">
                      <div 
                        className="flex flex-col gap-4 items-center overflow-auto h-full p-2 border-2 border-dashed border-muted-foreground/20 rounded-md"
                        onDragOver={handleDragOver}
                        onDrop={handleReturnToBench}
                      >
                        {getBenchPlayers().map(player => (
                          <div 
                            key={player.id} 
                            draggable={isCurrentUserCaptain}
                            onDragStart={() => handleDragStart(player)}
                            className={`cursor-${isCurrentUserCaptain ? 'grab' : 'pointer'} relative`}
                            onClick={() => viewPlayerProfile(player.id)}
                          >
                            <Avatar className="w-12 h-12 border-2 border-muted-foreground/20 hover:border-primary transition-colors">
                              <AvatarImage src={player.avatar} alt={player.name} />
                              <AvatarFallback>{player.name.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            {player.isCaptain && (
                              <div className="absolute -left-3 -top-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center z-20 border-2 border-white">
                                C
                              </div>
                            )}
                            <Badge className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center p-0">
                              {player.rating}
                            </Badge>
                            <p className="text-xs text-center mt-1 font-medium">{player.name}</p>
                            <p className="text-xs text-center text-muted-foreground capitalize">{player.position}</p>
                          </div>
                        ))}
                        {getBenchPlayers().length === 0 && (
                          <p className="text-xs text-muted-foreground py-4 text-center">Tutti i giocatori sono sul campo</p>
                        )}
                      </div>
                    </CardContent>
                    {isCurrentUserCaptain && (
                      <CardFooter className="p-2 justify-center">
                        <Button size="sm" variant="outline" className="w-full">
                          <UserPlus className="mr-1 h-3 w-3" />
                          <span className="text-xs">Aggiungi</span>
                        </Button>
                      </CardFooter>
                    )}
                  </Card>
                </div>
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
                <Avatar className="h-24 w-24 mb-4 cursor-pointer" onClick={() => viewPlayerProfile(99)}>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xl">GM</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">Gianni Morandi</h3>
                <p className="text-muted-foreground">Attaccante • 6 conquiste</p>
                <div className="flex items-center mt-2">
                  <Award className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-bold">MVP</span>
                </div>
                <Button variant="outline" className="mt-4 w-full" onClick={() => viewPlayerProfile(99)}>
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
                          <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <Link to="/team-events">
                      <Calendar className="mr-2 h-4 w-4" />
                      Prossimi Eventi
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="default">
                    <Link to="/team-events/create">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Aggiungi Evento
                    </Link>
                  </Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeamDashboard;

