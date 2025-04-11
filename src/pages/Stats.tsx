
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Star, Trophy, Upload, Check, X, PlusCircle, MinusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatVote {
  playerId: number;
  statName: string;
  value: number; // 1 for positive, -1 for negative
}

const Stats = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [eventType, setEventType] = useState<"palo" | "conquista">("palo");
  const [girlName, setGirlName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Track player stat votes to prevent multiple votes
  const [playerStatVotes, setPlayerStatVotes] = useState<StatVote[]>([]);

  // Mock events for the team
  const [teamEvents, setTeamEvents] = useState([
    {
      id: 1,
      type: "palo",
      playerName: "GiocatoreFre",
      playerAvatar: "/placeholder.svg",
      playerId: 101,
      girlName: "Anna",
      details: "Usciti insieme, ma alla fine niente di che...",
      date: "2025-04-10",
      image: "/placeholder.svg",
      votes: { positive: 5, negative: 1 },
      hasVoted: false,
      statPoints: {
        coraggio: { positive: 2, negative: 0, voters: ["Player1", "Player2"] },
        endurance: { positive: 1, negative: 0, voters: ["Player3"] },
        dribbling: { positive: 0, negative: 0, voters: [] },
        humor: { positive: 3, negative: 1, voters: ["Player1", "Player2", "Player4"] },
        resistenza: { positive: 0, negative: 0, voters: [] },
        social: { positive: 1, negative: 0, voters: ["Player5"] },
      }
    },
    {
      id: 2,
      type: "conquista",
      playerName: "AmicoFre",
      playerAvatar: "/placeholder.svg",
      playerId: 102,
      girlName: "Laura",
      details: "Serata straordinaria al locale!",
      date: "2025-04-05",
      image: null,
      votes: { positive: 7, negative: 0 },
      hasVoted: true,
      statPoints: {
        coraggio: { positive: 3, negative: 0, voters: ["Player1", "Player2", "Player3"] },
        endurance: { positive: 4, negative: 0, voters: ["Player4", "Player5", "Player6", "Player7"] },
        dribbling: { positive: 2, negative: 1, voters: ["Player8", "Player9"] },
        humor: { positive: 1, negative: 0, voters: ["Player10"] },
        resistenza: { positive: 3, negative: 0, voters: ["Player11", "Player12", "Player13"] },
        social: { positive: 5, negative: 1, voters: ["Player14", "Player15", "Player16", "Player17", "Player18"] },
      }
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!girlName) {
      toast.error("Inserisci il nome della ragazza");
      return;
    }

    if (!details) {
      toast.error("Inserisci i dettagli dell'evento");
      return;
    }

    // In a real app, we would save this to a database
    // For now, just show a success message
    toast.success(
      `${eventType === 'palo' ? 'Palo' : 'Conquista'} registrato con successo!`,
      {
        description: `Evento con ${girlName} aggiunto alla storia della tua squadra.`
      }
    );

    setGirlName("");
    setDetails("");
    setImage(null);
    setImagePreview(null);
  };

  const handleVote = (eventId: number, isPositive: boolean) => {
    setTeamEvents(events => 
      events.map(event => {
        if (event.id === eventId) {
          const updatedEvent = { 
            ...event,
            votes: {
              ...event.votes,
              positive: isPositive ? event.votes.positive + 1 : event.votes.positive,
              negative: !isPositive ? event.votes.negative + 1 : event.votes.negative
            },
            hasVoted: true
          };
          return updatedEvent;
        }
        return event;
      })
    );
    toast.success(`Voto registrato con successo!`);
  };

  const getCurrentUser = () => {
    // In a real app, get this from authentication state
    return "CurrentUser";
  };

  const handleStatRating = (eventId: number, playerId: number, stat: string, isPositive: boolean = true) => {
    const currentUser = getCurrentUser();
    
    // Check if the user has already voted on this stat for this player
    const existingVote = playerStatVotes.find(
      vote => vote.playerId === playerId && vote.statName === stat
    );
    
    if (existingVote) {
      toast.error("Hai già assegnato un punto in questa caratteristica", {
        icon: <X className="h-4 w-4 text-red-500" />
      });
      return;
    }
    
    // Update the events
    setTeamEvents(events => 
      events.map(event => {
        if (event.id === eventId) {
          const updatedStatPoints = { ...event.statPoints };
          
          if (!updatedStatPoints[stat]) {
            updatedStatPoints[stat] = { positive: 0, negative: 0, voters: [] };
          }
          
          if (isPositive) {
            updatedStatPoints[stat].positive += 1;
          } else {
            updatedStatPoints[stat].negative += 1;
          }
          
          updatedStatPoints[stat].voters.push(currentUser);
          
          return { ...event, statPoints: updatedStatPoints };
        }
        return event;
      })
    );
    
    // Add the vote to our tracking state
    setPlayerStatVotes([
      ...playerStatVotes,
      { playerId, statName: stat, value: isPositive ? 1 : -1 }
    ]);
    
    toast.success(`Hai aggiunto ${isPositive ? '+1' : '-1'} a ${stat}!`);
  };

  const statOptions = ["coraggio", "endurance", "dribbling", "humor", "resistenza", "social"];

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Stats</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="add" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>Aggiungi Stats</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Stats della Squadra</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Aggiungi un nuovo evento</CardTitle>
                <CardDescription>
                  Registra un palo o una conquista per tenere traccia dei tuoi progressi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo di Evento</Label>
                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant={eventType === 'palo' ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setEventType('palo')}
                      >
                        <Star className="mr-1 h-4 w-4" />
                        Palo
                      </Button>
                      <Button 
                        type="button"
                        variant={eventType === 'conquista' ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setEventType('conquista')}
                      >
                        <Trophy className="mr-1 h-4 w-4" />
                        Conquista
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="girlName">Nome della Ragazza</Label>
                    <Input
                      id="girlName"
                      value={girlName}
                      onChange={(e) => setGirlName(e.target.value)}
                      placeholder="Inserisci il nome"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="details">Dettagli dell'Evento</Label>
                    <Textarea
                      id="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder={`Racconta com'è andata...`}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Foto (opzionale)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="flex-1"
                      />
                    </div>
                    {imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-h-40 rounded-md object-cover" 
                        />
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full">
                    Salva Evento
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Eventi della Squadra</h2>
              
              {teamEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
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
                    {event.image && (
                      <div className="rounded-md overflow-hidden mb-4">
                        <img 
                          src={event.image} 
                          alt={`${event.type} con ${event.girlName}`} 
                          className="w-full h-auto max-h-60 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm flex items-center gap-1">
                          <Check className="h-4 w-4 text-green-500" />
                          {event.votes.positive}
                        </span>
                        <span className="text-sm flex items-center gap-1">
                          <X className="h-4 w-4 text-red-500" />
                          {event.votes.negative}
                        </span>
                      </div>
                      {!event.hasVoted && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleVote(event.id, true)}
                          >
                            <Check className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleVote(event.id, false)}
                          >
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Stat ratings summary */}
                    <div className="bg-muted/20 rounded-md p-3 mb-4">
                      <h4 className="text-sm font-medium mb-2">Punti Stats:</h4>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        {statOptions.map(stat => {
                          const statData = event.statPoints[stat] || { positive: 0, negative: 0, voters: [] };
                          return (
                            <div key={stat} className="flex items-center justify-between">
                              <span className="capitalize">{stat}:</span>
                              <div className="flex items-center gap-1">
                                <span className="text-green-500">+{statData.positive}</span>
                                <span>/</span>
                                <span className="text-red-500">-{statData.negative}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Modifica statistiche:</p>
                      <div className="flex flex-wrap gap-2">
                        {statOptions.map(stat => {
                          // Check if current user has already voted on this stat
                          const hasVoted = playerStatVotes.some(
                            vote => vote.playerId === event.playerId && vote.statName === stat
                          );
                          
                          return (
                            <div key={stat} className="flex items-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8 px-2 py-1 capitalize"
                                      onClick={() => handleStatRating(event.id, event.playerId, stat, true)}
                                      disabled={hasVoted}
                                    >
                                      <PlusCircle className="h-3 w-3 mr-1 text-green-500" /> 
                                      {stat}
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{hasVoted ? "Hai già votato" : `Aggiungi +1 a ${stat}`}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="h-8 w-8 ml-1"
                                      onClick={() => handleStatRating(event.id, event.playerId, stat, false)}
                                      disabled={hasVoted}
                                    >
                                      <MinusCircle className="h-3 w-3 text-red-500" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{hasVoted ? "Hai già votato" : `Togli -1 a ${stat}`}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Stats;

