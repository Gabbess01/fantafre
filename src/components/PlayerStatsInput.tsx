
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Star, Flag, UserPlus, Trophy } from "lucide-react";

interface PlayerProfile {
  id: string | number;
  name: string;
  team: string;
  position: string;
  avatar?: string;
}

interface PlayerStatsInputProps {
  players: PlayerProfile[];
}

const PlayerStatsInput = ({ players }: PlayerStatsInputProps) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
  const [statType, setStatType] = useState<"pali" | "conquiste">("pali");
  const [count, setCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlayerId) {
      toast.error("Seleziona un giocatore");
      return;
    }

    const selectedPlayer = players.find(p => p.id.toString() === selectedPlayerId);
    if (!selectedPlayer) return;

    toast.success(
      `Hai aggiunto ${count} ${statType === 'pali' ? 'pali' : 'conquiste'} a ${selectedPlayer.name}!`,
      {
        description: `Le statistiche sono state aggiornate con successo.`
      }
    );

    // Reset form
    setCount(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {statType === 'pali' ? <Star className="h-5 w-5 text-fregna-primary" /> : <Trophy className="h-5 w-5 text-fregna-secondary" />}
          Aggiungi Statistiche
        </CardTitle>
        <CardDescription>
          Registra pali o conquiste per i tuoi giocatori
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="player">Seleziona Giocatore</Label>
            <Select value={selectedPlayerId} onValueChange={setSelectedPlayerId}>
              <SelectTrigger id="player">
                <SelectValue placeholder="Seleziona un giocatore" />
              </SelectTrigger>
              <SelectContent>
                {players.map((player) => (
                  <SelectItem key={player.id} value={player.id.toString()}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span>{player.name} ({player.team})</span>
                    </div>
                  </SelectItem>
                ))}
                {players.length === 0 && (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    Nessun giocatore disponibile
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tipo di Statistica</Label>
            <div className="flex gap-4">
              <Button 
                type="button"
                variant={statType === 'pali' ? "default" : "outline"}
                className="flex-1"
                onClick={() => setStatType('pali')}
              >
                <Star className="mr-1 h-4 w-4" />
                Pali
              </Button>
              <Button 
                type="button"
                variant={statType === 'conquiste' ? "default" : "outline"}
                className="flex-1"
                onClick={() => setStatType('conquiste')}
              >
                <Trophy className="mr-1 h-4 w-4" />
                Conquiste
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Quantità</Label>
            <Input
              id="count"
              type="number"
              min={1}
              max={10}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            />
          </div>

          <Button type="submit" className="w-full">
            Salva Statistiche
          </Button>
        </form>
      </CardContent>

      {players.length === 0 && (
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/create-player">
              <UserPlus className="mr-2 h-4 w-4" />
              Crea o aggiungi un giocatore
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PlayerStatsInput;
