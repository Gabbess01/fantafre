
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Trophy, Users } from "lucide-react";

export type PlayerStats = {
  pali: number;
  conquiste: number;
  tentativi: number;
  streak: number;
};

export type Player = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  rank: number;
  stats: PlayerStats;
};

interface PlayerCardProps {
  player: Player;
  detailed?: boolean;
}

const PlayerCard = ({ player, detailed = false }: PlayerCardProps) => {
  const { name, avatar, rating, rank, stats } = player;
  const successRate = stats.tentativi > 0 ? Math.round((stats.conquiste / stats.tentativi) * 100) : 0;
  const paliRate = stats.tentativi > 0 ? Math.round((stats.pali / stats.tentativi) * 100) : 0;

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="relative p-0">
        <div className="h-24 bg-gradient-to-r from-fregna-primary to-fregna-secondary" />
        <div className="absolute -bottom-12 left-4">
          <div className="rounded-full w-24 h-24 border-4 border-background bg-muted overflow-hidden">
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }} 
            />
          </div>
        </div>
        {rank <= 3 && (
          <div className="absolute top-4 right-4">
            <Badge className="px-3 py-1.5 bg-fregna-accent text-white">
              <Trophy className="w-4 h-4 mr-1" />
              {rank === 1 ? "1° Posto" : rank === 2 ? "2° Posto" : "3° Posto"}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-14 pb-4">
        <CardTitle className="flex justify-between items-center mb-4">
          <span>{name}</span>
          <div className="flex items-center bg-muted rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-fregna-accent mr-1 fill-fregna-accent" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </CardTitle>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Pali</span>
              <span className="text-sm text-muted-foreground">{stats.pali}</span>
            </div>
            <Progress value={paliRate} className="h-2 bg-muted" />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Conquiste</span>
              <span className="text-sm text-muted-foreground">{stats.conquiste}</span>
            </div>
            <Progress value={successRate} className="h-2 bg-muted" />
          </div>
          
          {detailed && (
            <>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-sm">Tentativi totali</span>
                <span className="text-sm font-medium">{stats.tentativi}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Streak attuale</span>
                <Badge variant="outline" className="font-medium">
                  {stats.streak} 🔥
                </Badge>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
