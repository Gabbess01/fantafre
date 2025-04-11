
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, ArrowRight, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

// Mock teams data
const teamsData = [
  {
    id: 1,
    name: "Squadra Pro",
    logo: "/placeholder.svg",
    playerCount: 8,
    formation: "4-3-3",
    stats: {
      pali: 32,
      conquiste: 18,
      events: 50,
      successRate: 36
    }
  },
  {
    id: 2,
    name: "Old Friends FC",
    logo: "/placeholder.svg",
    playerCount: 11,
    formation: "4-4-2",
    stats: {
      pali: 45,
      conquiste: 23,
      events: 68,
      successRate: 34
    }
  },
  {
    id: 3,
    name: "FantaTeam",
    logo: "/placeholder.svg",
    playerCount: 10,
    formation: "3-5-2",
    stats: {
      pali: 28,
      conquiste: 14,
      events: 42,
      successRate: 33
    }
  }
];

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter teams based on search term
  const filteredTeams = teamsData.filter(team => 
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Squadre</h1>
            <p className="text-muted-foreground mt-1">
              Esplora tutte le squadre del FantaFregna
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                placeholder="Cerca squadre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="min-w-[200px] pr-8"
              />
            </div>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Ordina per</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[200px] p-2">
                      <NavigationMenuLink className="cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        Nome A-Z
                      </NavigationMenuLink>
                      <NavigationMenuLink className="cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        Più giocatori
                      </NavigationMenuLink>
                      <NavigationMenuLink className="cursor-pointer block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                        % successi più alta
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Button asChild>
              <Link to="/create-player">
                Crea Squadra
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.length > 0 ? (
            filteredTeams.map(team => (
              <Card key={team.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={team.logo} alt={team.name} />
                      <AvatarFallback className="bg-muted">
                        <Shield className="h-6 w-6 text-muted-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{team.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Users className="h-3 w-3" />
                        <span>{team.playerCount} Giocatori</span>
                        <Badge variant="outline" className="text-xs ml-1">
                          {team.formation}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-center mb-1">
                        <Star className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="text-lg font-bold">{team.stats.pali}</div>
                      <div className="text-xs text-muted-foreground">Pali</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-center mb-1">
                        <Trophy className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-lg font-bold">{team.stats.conquiste}</div>
                      <div className="text-xs text-muted-foreground">Conquiste</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Eventi totali: {team.stats.events}</span>
                    <span className="font-medium">
                      Successi: {team.stats.successRate}%
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 pt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link to={`/team/${team.id}`} className="flex items-center justify-center gap-2">
                      Vedi Dettagli
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">
                Nessuna squadra trovata con il termine "{searchTerm}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teams;
