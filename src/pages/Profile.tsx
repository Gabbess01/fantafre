
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Users, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "@/components/StatsCard";

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

const Profile = () => {
  const successRate = user.stats.tentativi > 0 
    ? Math.round((user.stats.conquiste / user.stats.tentativi) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  );
};

export default Profile;
