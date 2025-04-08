
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Player } from "./PlayerCard";
import { Trophy, Star } from "lucide-react";

interface LeaderboardTableProps {
  players: Player[];
}

const LeaderboardTable = ({ players }: LeaderboardTableProps) => {
  const sortedPlayers = [...players].sort((a, b) => a.rank - b.rank);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-16 text-center">Pos.</TableHead>
            <TableHead>Giocatore</TableHead>
            <TableHead className="text-center">Rating</TableHead>
            <TableHead className="text-center hidden md:table-cell">Pali</TableHead>
            <TableHead className="text-center hidden md:table-cell">Conquiste</TableHead>
            <TableHead className="text-center hidden sm:table-cell">Success %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPlayers.map((player) => {
            const successRate = 
              player.stats.tentativi > 0 
                ? Math.round((player.stats.conquiste / player.stats.tentativi) * 100) 
                : 0;
                
            return (
              <TableRow key={player.id} className="hover:bg-muted/50">
                <TableCell className="font-medium text-center">
                  {player.rank === 1 ? (
                    <Trophy className="w-5 h-5 text-fregna-accent mx-auto" />
                  ) : (
                    player.rank
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                      <img 
                        src={player.avatar} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div>{player.name}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 text-fregna-accent mr-1 fill-fregna-accent" />
                    {player.rating}
                  </div>
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">{player.stats.pali}</TableCell>
                <TableCell className="text-center hidden md:table-cell">{player.stats.conquiste}</TableCell>
                <TableCell className="text-center hidden sm:table-cell">
                  <span className={`
                    ${successRate >= 50 ? 'text-green-600' : successRate >= 30 ? 'text-amber-600' : 'text-red-600'}
                  `}>
                    {successRate}%
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
