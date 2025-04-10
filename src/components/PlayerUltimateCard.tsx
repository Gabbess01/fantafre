
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PlayerUltimateStatsProps {
  player: {
    name: string;
    position: string;
    avatar?: string;
    team: string;
    rating: number;
    stats: {
      coraggio: number;
      endurance: number;
      dribbling: number;
      humor: number;
      resistenza: number;
      social: number;
    };
  };
}

const PlayerUltimateCard = ({ player }: PlayerUltimateStatsProps) => {
  const getStatColor = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="overflow-hidden border-2 border-yellow-500/50">
      <CardHeader className="relative p-0 pb-4">
        <div className="h-24 bg-gradient-to-br from-amber-300 to-amber-500 relative">
          <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
        </div>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-amber-500 bg-white">
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback className="bg-gradient-to-r from-fregna-primary to-fregna-secondary text-white text-xl">
                {player.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold p-0">
              {player.rating}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-16">
        <div className="text-center mb-4">
          <CardTitle className="text-xl font-bold">{player.name}</CardTitle>
          <p className="text-sm text-muted-foreground">{player.position} · {player.team}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-4 rounded-lg space-y-3">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Coraggio</span>
                <span>{player.stats.coraggio}</span>
              </div>
              <Progress 
                value={player.stats.coraggio} 
                max={100} 
                className="h-2" 
                indicatorClassName={getStatColor(player.stats.coraggio)}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Endurance</span>
                <span>{player.stats.endurance}</span>
              </div>
              <Progress 
                value={player.stats.endurance} 
                max={100} 
                className="h-2" 
                indicatorClassName={getStatColor(player.stats.endurance)}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Dribbling</span>
                <span>{player.stats.dribbling}</span>
              </div>
              <Progress 
                value={player.stats.dribbling} 
                max={100} 
                className="h-2" 
                indicatorClassName={getStatColor(player.stats.dribbling)}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Humor</span>
                <span>{player.stats.humor}</span>
              </div>
              <Progress 
                value={player.stats.humor} 
                max={100} 
                className="h-2" 
                indicatorClassName={getStatColor(player.stats.humor)}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Resistenza</span>
                <span>{player.stats.resistenza}</span>
              </div>
              <Progress 
                value={player.stats.resistenza} 
                max={100} 
                className="h-2" 
                indicatorClassName={getStatColor(player.stats.resistenza)}
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Social</span>
                <span>{player.stats.social}</span>
              </div>
              <Progress 
                value={player.stats.social} 
                max={100} 
                className="h-2" 
                indicatorClassName={getStatColor(player.stats.social)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerUltimateCard;
