
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaderboardTable from "@/components/LeaderboardTable";
import PlayerCard from "@/components/PlayerCard";
import { mockPlayers } from "@/data/mockData";
import { Button } from "@/components/ui/button";

const Leaderboard = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-8 gradient-text">Classifica giocatori</h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">Tutti</TabsTrigger>
            <TabsTrigger value="monthly">Mensile</TabsTrigger>
            <TabsTrigger value="weekly">Settimanale</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              Tabella
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              Griglia
            </Button>
          </div>
        </div>
        
        <TabsContent value="all">
          {viewMode === "table" ? (
            <LeaderboardTable players={mockPlayers} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockPlayers.map(player => (
                <PlayerCard key={player.id} player={player} detailed />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="monthly">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Classifica mensile disponibile prossimamente...
          </div>
        </TabsContent>
        
        <TabsContent value="weekly">
          <div className="flex items-center justify-center p-8 text-muted-foreground">
            Classifica settimanale disponibile prossimamente...
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
