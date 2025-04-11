
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TeamEvents = () => {
  // Mock events data
  const upcomingEvents = [
    {
      id: 1,
      title: "Serata in discoteca",
      date: "2025-04-12",
      time: "22:00",
      location: "Club XYZ",
      description: "Serata di gruppo in discoteca, occasione per conoscere nuove ragazze."
    },
    {
      id: 2,
      title: "Aperitivo di squadra",
      date: "2025-04-22",
      time: "19:00",
      location: "Bar Centrale",
      description: "Aperitivo con tutta la squadra per discutere le strategie di approccio."
    }
  ];
  
  const pastEvents = [
    {
      id: 3,
      title: "Festa universitaria",
      date: "2025-03-15",
      time: "21:00",
      location: "Università Statale",
      description: "Festa di facoltà con grande partecipazione.",
      stats: {
        tentativi: 8,
        pali: 3,
        conquiste: 2
      }
    }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Eventi della Squadra</h1>
            <p className="text-muted-foreground">Organizza e visualizza gli eventi della tua squadra</p>
          </div>
          <Button asChild>
            <Link to="/team-events/create">
              <PlusCircle className="mr-2 h-4 w-4" />
              Crea Evento
            </Link>
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Prossimi Eventi</TabsTrigger>
            <TabsTrigger value="past">Eventi Passati</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge>{formatDate(event.date)}</Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{event.time} • {event.location}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{event.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Modifica</Button>
                      <Button variant="default" size="sm">Partecipa</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Non ci sono eventi in programma</p>
                  <Button className="mt-4" asChild>
                    <Link to="/team-events/create">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Crea Evento
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="space-y-4">
                {pastEvents.map(event => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge variant="outline">{formatDate(event.date)}</Badge>
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{event.time} • {event.location}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{event.description}</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium">Tentativi</p>
                          <p className="text-xl font-bold">{event.stats.tentativi}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium">Pali</p>
                          <p className="text-xl font-bold">{event.stats.pali}</p>
                        </div>
                        <div className="bg-muted/30 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium">Conquiste</p>
                          <p className="text-xl font-bold">{event.stats.conquiste}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline" size="sm">Vedi Dettagli</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">Non ci sono eventi passati</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamEvents;
