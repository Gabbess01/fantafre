
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PlayerAffiliationCardProps {
  playerTeam: {
    id: string | number;
    teamName: string;
    position: string;
    joinedDate: string;
    teamLogo?: string;
    playerCount: number;
  } | null;
}

const PlayerAffiliationCard = ({ playerTeam }: PlayerAffiliationCardProps) => {
  if (!playerTeam) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>La tua squadra</CardTitle>
          <CardDescription>
            Non sei ancora affiliato a nessuna squadra
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="text-muted-foreground mb-4">
            Unisciti a una squadra esistente o crea la tua
          </p>
          <Button asChild>
            <Link to="/create-player">
              <UserPlus className="mr-2 h-4 w-4" />
              Crea o Unisciti a una Squadra
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>La tua squadra</CardTitle>
        <CardDescription>
          Dettagli sulla tua affiliazione
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={playerTeam.teamLogo} />
              <AvatarFallback className="bg-muted">
                <Users className="h-6 w-6 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{playerTeam.teamName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Ruolo: {playerTeam.position}</span>
                <Badge variant="outline" size="sm" className="text-xs">
                  {playerTeam.playerCount} Giocatori
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Membro dal {playerTeam.joinedDate}
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" asChild>
            <Link to={`/team/${playerTeam.id}`} className="flex items-center gap-1">
              Dettagli
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerAffiliationCard;
