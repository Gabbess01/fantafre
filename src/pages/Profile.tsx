
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, ArrowRight, Trophy, Plus, UserCircle, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/StatsCard";
import PlayerUltimateCard from "@/components/PlayerUltimateCard";
import PlayerStatsInput from "@/components/PlayerStatsInput";
import TeamParticipationCard from "@/components/TeamParticipationCard";
import PlayerAffiliationCard from "@/components/PlayerAffiliationCard";

// Mock user data - in a real app, this would come from your auth provider
const user = {
  username: "GiocatoreFre",
  email: "giocatore@example.com",
  avatar: "/placeholder.svg",
  teamName: "Squadra Pro",
  stats: {
    pali: 42,
    conquiste: 15,
    tentativi: 57,
    rank: 5,
  }
};

// Mock player ultimate stats
const playerStats = {
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
};

// Mock player affiliations
const playerTeam = {
  id: 1,
  teamName: "Squadra Pro",
  position: "Attaccante",
  joinedDate: "12/03/2023",
  teamLogo: "/placeholder.svg",
  playerCount: 8,
};

// Mock teams the user is participating in
const participatingTeams = [
  {
    id: 1,
    name: "Squadra Pro",
    formation: "4-3-3",
    playerCount: 8,
    logo: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Old Friends FC",
    formation: "4-4-2",
    playerCount: 11,
    logo: "/placeholder.svg",
  },
];

// Mock player profiles for stats input
const playerProfiles = [
  {
    id: 1,
    name: "GiocatoreFre",
    team: "Squadra Pro",
    position: "Attaccante",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "AmicoFre",
    team: "Old Friends FC",
    position: "Centrocampista",
    avatar: "/placeholder.svg",
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const successRate = user.stats.tentativi > 0 
    ? Math.round((user.stats.conquiste / user.stats.tentativi) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 border-2 border-fregna-primary">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="text-lg bg-gradient-to-r from-fregna-primary to-fregna-secondary text-white">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.username}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <p className="text-sm font-medium text-fregna-primary">{user.teamName}</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/profile/settings">
                Modifica Profilo
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Trophy className="h-5 w-5 text-fregna-primary" />
              <span className="font-medium">Rank #{user.stats.rank}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <StatsCard
                title="Totale Pali"
                value={user.stats.pali}
                description="Il tuo score personale"
                icon={<Star className="w-5 h-5" />}
                trend={{ value: 3, isPositive: true }}
              />
              <StatsCard
                title="Conquiste riuscite"
                value={user.stats.conquiste}
                description="Quando sei stato bravo"
                icon={<Star className="w-5 h-5" />}
                trend={{ value: 1, isPositive: true }}
              />
              <StatsCard
                title="Percentuale di successo"
                value={`${successRate}%`}
                description={`Su ${user.stats.tentativi} tentativi totali`}
                icon={<Users className="w-5 h-5" />}
                trend={{ value: 2, isPositive: successRate > 30 }}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button asChild>
              <Link to="/team/1" className="flex items-center gap-2">
                Vai alla pagina del team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              <span className="hidden sm:inline">Scheda Giocatore</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Le Mie Squadre</span>
            </TabsTrigger>
            <TabsTrigger value="add-stats" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Aggiungi Stats</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PlayerAffiliationCard playerTeam={playerTeam} />
              <PlayerUltimateCard player={playerStats} />
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="flex justify-center py-8">
              <div className="max-w-md w-full">
                <PlayerUltimateCard player={playerStats} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Le Mie Squadre</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participatingTeams.map(team => (
                <TeamParticipationCard key={team.id} team={team} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button asChild>
                <Link to="/create-player">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Unisciti a un'altra squadra
                </Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="add-stats" className="space-y-6">
            <div className="max-w-lg mx-auto">
              <PlayerStatsInput players={playerProfiles} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
