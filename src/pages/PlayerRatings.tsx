
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trophy, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Mock data for players
const teamPlayers = [
  {
    id: 1,
    name: "GiocatoreFre",
    avatar: "/placeholder.svg",
    team: "Squadra Pro",
    position: "Attaccante"
  },
  {
    id: 2,
    name: "AmicoFre",
    avatar: "/placeholder.svg",
    team: "Squadra Pro",
    position: "Centrocampista"
  },
  {
    id: 3,
    name: "AltroBro",
    avatar: "/placeholder.svg",
    team: "Squadra Pro",
    position: "Difensore"
  }
];

// Mock data for events that need rating
const eventsToRate = [
  {
    id: 1,
    playerId: 1,
    playerName: "GiocatoreFre",
    playerAvatar: "/placeholder.svg",
    type: "palo",
    girlName: "Sofia",
    details: "Serata interessante ma alla fine niente...",
    date: "2025-04-09",
    alreadyRated: false
  },
  {
    id: 2,
    playerId: 2,
    playerName: "AmicoFre",
    playerAvatar: "/placeholder.svg",
    type: "conquista",
    girlName: "Martina",
    details: "Serata fantastica al pub!",
    date: "2025-04-07",
    alreadyRated: true
  }
];

const PlayerRatings = () => {
  const [activeTab, setActiveTab] = useState("rate-events");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
  const [stats, setStats] = useState({
    coraggio: 50,
    endurance: 50,
    dribbling: 50,
    humor: 50,
    resistenza: 50,
    social: 50
  });

  const handleStatChange = (statName: keyof typeof stats, value: number[]) => {
    setStats(prev => ({
      ...prev,
      [statName]: value[0]
    }));
  };

  const handleSubmitRating = () => {
    if (!selectedPlayerId) {
      toast.error("Seleziona un giocatore");
      return;
    }
    
    toast.success("Valutazione inviata con successo!");
    setSelectedPlayerId("");
    setStats({
      coraggio: 50,
      endurance: 50,
      dribbling: 50,
      humor: 50,
      resistenza: 50,
      social: 50
    });
  };

  const handleVoteEvent = (eventId: number, isPositive: boolean) => {
    toast.success(`Hai ${isPositive ? 'confermato' : 'bocciato'} l'evento!`);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Valutazioni Giocatori</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="rate-events" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Valuta Eventi</span>
            </TabsTrigger>
            <TabsTrigger value="rate-players" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span>Valuta Giocatori</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rate-events">
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Eventi da Valutare</h2>
              
              {eventsToRate.map(event => (
                <Card key={event.id}>
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className={`p-2 rounded-full ${
                      event.type === 'palo' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' : 
                      'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    }`}>
                      {event.type === 'palo' ? (
                        <Star className="h-5 w-5" />
                      ) : (
                        <Trophy className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={event.playerAvatar} />
                          <AvatarFallback>{event.playerName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{event.playerName}</span>
                      </div>
                      <CardTitle className="text-lg">
                        {event.type === 'palo' ? 'Palo con ' : 'Conquista con '} 
                        <span className="font-semibold">{event.girlName}</span>
                      </CardTitle>
                      <CardDescription className="text-xs">{event.date}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{event.details}</p>
                    
                    {!event.alreadyRated ? (
                      <div className="flex justify-end gap-4 mt-4">
                        <Button 
                          onClick={() => handleVoteEvent(event.id, true)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Conferma
                        </Button>
                        <Button 
                          onClick={() => handleVoteEvent(event.id, false)}
                          variant="destructive"
                        >
                          <ThumbsDown className="mr-2 h-4 w-4" />
                          Boccia
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground text-sm mt-4">
                        Hai già valutato questo evento
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {eventsToRate.length === 0 && (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-muted-foreground">
                      Non ci sono eventi da valutare al momento
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rate-players">
            <Card>
              <CardHeader>
                <CardTitle>Valuta un Giocatore</CardTitle>
                <CardDescription>
                  Modifica le statistiche di un giocatore della tua squadra
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="player-select">Seleziona Giocatore</Label>
                  <Select value={selectedPlayerId} onValueChange={setSelectedPlayerId}>
                    <SelectTrigger id="player-select">
                      <SelectValue placeholder="Seleziona un giocatore" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamPlayers.map(player => (
                        <SelectItem key={player.id} value={player.id.toString()}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={player.avatar} />
                              <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            {player.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPlayerId && (
                  <>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="coraggio">Coraggio</Label>
                          <span className="text-sm font-medium">{stats.coraggio}</span>
                        </div>
                        <Slider
                          id="coraggio"
                          min={0}
                          max={100}
                          step={1}
                          value={[stats.coraggio]}
                          onValueChange={(value) => handleStatChange('coraggio', value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="endurance">Endurance</Label>
                          <span className="text-sm font-medium">{stats.endurance}</span>
                        </div>
                        <Slider
                          id="endurance"
                          min={0}
                          max={100}
                          step={1}
                          value={[stats.endurance]}
                          onValueChange={(value) => handleStatChange('endurance', value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="dribbling">Dribbling</Label>
                          <span className="text-sm font-medium">{stats.dribbling}</span>
                        </div>
                        <Slider
                          id="dribbling"
                          min={0}
                          max={100}
                          step={1}
                          value={[stats.dribbling]}
                          onValueChange={(value) => handleStatChange('dribbling', value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="humor">Humor</Label>
                          <span className="text-sm font-medium">{stats.humor}</span>
                        </div>
                        <Slider
                          id="humor"
                          min={0}
                          max={100}
                          step={1}
                          value={[stats.humor]}
                          onValueChange={(value) => handleStatChange('humor', value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="resistenza">Resistenza</Label>
                          <span className="text-sm font-medium">{stats.resistenza}</span>
                        </div>
                        <Slider
                          id="resistenza"
                          min={0}
                          max={100}
                          step={1}
                          value={[stats.resistenza]}
                          onValueChange={(value) => handleStatChange('resistenza', value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="social">Social</Label>
                          <span className="text-sm font-medium">{stats.social}</span>
                        </div>
                        <Slider
                          id="social"
                          min={0}
                          max={100}
                          step={1}
                          value={[stats.social]}
                          onValueChange={(value) => handleStatChange('social', value)}
                        />
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6" 
                      onClick={handleSubmitRating}
                    >
                      Salva Valutazione
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlayerRatings;
