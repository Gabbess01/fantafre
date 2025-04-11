
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import PlayerUltimateCard from "@/components/PlayerUltimateCard";

// Mock data for players
const playersData = [
  {
    id: 1,
    name: "GiocatoreFre",
    position: "Attaccante",
    avatar: "/placeholder.svg",
    team: "Squadra Pro",
    rating: 82,
    stats: {
      coraggio: 87,
      endurance: 75,
      dribbling: 90,
      humor: 93,
      resistenza: 72,
      social: 88,
    }
  },
  {
    id: 2,
    name: "AmicoFre",
    position: "Centrocampista",
    avatar: "/placeholder.svg",
    team: "Old Friends FC",
    rating: 78,
    stats: {
      coraggio: 75,
      endurance: 80,
      dribbling: 84,
      humor: 86,
      resistenza: 79,
      social: 70,
    }
  },
  {
    id: 3,
    name: "AltroBro",
    position: "Difensore",
    avatar: "/placeholder.svg",
    team: "FantaTeam",
    rating: 76,
    stats: {
      coraggio: 72,
      endurance: 85,
      dribbling: 68,
      humor: 79,
      resistenza: 88,
      social: 74,
    }
  }
];

const Cards = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("all");
  const [positionFilter, setPositionFilter] = useState<string>("all");
  
  // Get unique teams and positions for filters
  const teams = ['all', ...new Set(playersData.map(player => player.team))];
  const positions = ['all', ...new Set(playersData.map(player => player.position))];
  
  // Filter players based on search and filters
  const filteredPlayers = playersData.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = teamFilter === 'all' || player.team === teamFilter;
    const matchesPosition = positionFilter === 'all' || player.position === positionFilter;
    
    return matchesSearch && matchesTeam && matchesPosition;
  });

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Cards Giocatori</h1>
            <p className="text-muted-foreground mt-1">
              Esplora le ultimate cards di tutti i giocatori
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <Input
              placeholder="Cerca giocatori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select value={teamFilter} onValueChange={setTeamFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtra per squadra" />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    {team === 'all' ? 'Tutte le squadre' : team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtra per ruolo" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position === 'all' ? 'Tutti i ruoli' : position}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="flex justify-center">
                <PlayerUltimateCard player={player} />
              </div>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nessun giocatore trovato con i filtri selezionati
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setTeamFilter('all');
                setPositionFilter('all');
              }}>
                Resetta i filtri
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Cards;
