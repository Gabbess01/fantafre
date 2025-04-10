
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface TeamParticipationCardProps {
  team: {
    id: string | number;
    name: string;
    formation: string;
    playerCount: number;
    logo?: string;
  };
}

const TeamParticipationCard = ({ team }: TeamParticipationCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="h-12 bg-gradient-to-r from-fregna-primary to-fregna-secondary" />
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-background">
              <AvatarImage src={team.logo} alt={team.name} />
              <AvatarFallback className="bg-muted">
                <Users className="h-6 w-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{team.name}</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Modulo: {team.formation}</span>
                <Badge variant="outline" className="text-xs">
                  {team.playerCount} Giocatori
                </Badge>
              </div>
            </div>
          </div>
          <Button asChild size="sm" variant="ghost">
            <Link to={`/team/${team.id}`} className="flex items-center gap-1">
              Visualizza
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamParticipationCard;
