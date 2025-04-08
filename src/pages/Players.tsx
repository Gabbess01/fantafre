
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PlayerCard from "@/components/PlayerCard";
import { mockPlayers } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Player } from "@/components/PlayerCard";

const Players = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"rank" | "rating" | "pali" | "conquiste">("rank");
  
  const filteredPlayers = mockPlayers
    .filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortField) {
        case "rating":
          return b.rating - a.rating;
        case "pali":
          return b.stats.pali - a.stats.pali;
        case "conquiste":
          return b.stats.conquiste - a.stats.conquiste;
        default:
          return a.rank - b.rank;
      }
    });
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Lista giocatori</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Cerca giocatore..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-48">
          <Select value={sortField} onValueChange={(value) => setSortField(value as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Ordina per..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rank">Posizione</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="pali">Pali</SelectItem>
              <SelectItem value="conquiste">Conquiste</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredPlayers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl mb-4 text-muted-foreground">Nessun giocatore trovato</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>Mostra tutti</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} detailed />
          ))}
        </div>
      )}
    </div>
  );
};

export default Players;
