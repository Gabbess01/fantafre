
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const CreateTeamEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error("Inserisci un titolo per l'evento");
      return;
    }
    
    if (!date) {
      toast.error("Seleziona una data per l'evento");
      return;
    }
    
    if (!time) {
      toast.error("Inserisci un orario per l'evento");
      return;
    }

    // Create event object
    const newEvent = {
      id: Math.floor(Math.random() * 10000),
      title,
      description,
      location,
      date: date.toISOString().split('T')[0],
      time,
    };

    // In a real app, this would save to a database or state management
    // For now, we'll pretend it's saved
    
    // Check if event is in the future or past
    const eventDate = new Date(date);
    eventDate.setHours(
      parseInt(time.split(':')[0]),
      parseInt(time.split(':')[1]),
      0,
      0
    );
    
    const now = new Date();
    const isUpcoming = eventDate >= now;
    
    if (isUpcoming) {
      toast.success("Evento creato con successo!", {
        description: "L'evento è stato aggiunto ai prossimi eventi."
      });
    } else {
      toast.success("Evento storico aggiunto con successo!", {
        description: "L'evento è stato aggiunto agli eventi passati."
      });
    }
    
    navigate("/team-events");
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Crea Nuovo Evento</CardTitle>
            <CardDescription>
              Organizza un evento per la tua squadra
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo dell'evento</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Es. Serata in discoteca"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Fornisci dettagli sull'evento..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Luogo</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Es. Club XYZ"
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? (
                          format(date, "PPP", { locale: it })
                        ) : (
                          <span>Seleziona una data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Orario</Label>
                  <div className="relative">
                    <Clock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/team-events")}>
                Annulla
              </Button>
              <Button type="submit">
                Crea Evento
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CreateTeamEvent;
