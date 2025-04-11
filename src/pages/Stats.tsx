import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Star, Trophy, Upload, Check, X, PlusCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Stats = () => {
  const [activeTab, setActiveTab] = useState("add");
  const [eventType, setEventType] = useState<"palo" | "conquista">("palo");
  const [girlName, setGirlName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Mock events for the team
  const teamEvents = [
    {
      id: 1,
      type: "palo",
      playerName: "GiocatoreFre",
      playerAvatar: "/placeholder.svg",
      girlName: "Anna",
      details: "Usciti insieme, ma alla fine niente di che...",
      date: "2025-04-10",
      image: "/placeholder.svg",
      votes: { positive: 5, negative: 1 },
      hasVoted: false
    },
    {
      id: 2,
      type: "conquista",
      playerName: "AmicoFre",
      playerAvatar: "/placeholder.svg",
      girlName: "Laura",
      details: "Serata straordinaria al locale!",
      date: "2025-04-05",
      image: null,
      votes: { positive: 7, negative: 0 },
      hasVoted: true
    }
  ];

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
    toast.success(`Voto registrato con successo!`);
  };

  const handleStatRating = (eventId: number, stat: string) => {
    toast.success(`Hai aggiunto +1 a ${stat}!`);
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
                    <div>
                      <p className="text-sm font-medium mb-2">Aggiungi punti alle statistiche:</p>
                      <div className="flex flex-wrap gap-2">
                        {statOptions.map(stat => (
                          <TooltipProvider key={stat}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 px-2 py-1 capitalize"
                                  onClick={() => handleStatRating(event.id, stat)}
                                >
                                  <PlusCircle className="h-3 w-3 mr-1" /> 
                                  {stat}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Aggiungi +1 a {stat}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
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
