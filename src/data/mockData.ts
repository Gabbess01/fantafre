
import { Player } from "@/components/PlayerCard";

// Generate random player data
export const generateMockPlayers = (count: number): Player[] => {
  const players: Player[] = [];
  
  for (let i = 1; i <= count; i++) {
    // Generate random stats
    const tentativi = Math.floor(Math.random() * 50) + 5;
    const conquiste = Math.floor(Math.random() * Math.min(tentativi, 30));
    const pali = Math.floor(Math.random() * (tentativi - conquiste));
    
    players.push({
      id: i,
      name: `Giocatore ${i}`,
      avatar: `/placeholder.svg`,
      rating: Math.floor(Math.random() * 50) + 50, // Rating between 50-100
      rank: i, // We'll sort by rank later
      stats: {
        pali,
        conquiste,
        tentativi,
        streak: Math.floor(Math.random() * 5)
      }
    });
  }
  
  // Sort players by a combination of conquiste and pali to determine rankings
  return players
    .sort((a, b) => {
      // Higher score for more conquiste and pali
      const scoreA = a.stats.conquiste * 2 + a.stats.pali;
      const scoreB = b.stats.conquiste * 2 + b.stats.pali;
      return scoreB - scoreA;
    })
    .map((player, index) => ({
      ...player,
      rank: index + 1
    }));
};

// Generate 12 random players
export const mockPlayers = generateMockPlayers(12);

// Get global stats
export const getGlobalStats = () => {
  return mockPlayers.reduce(
    (acc, player) => {
      acc.totalPali += player.stats.pali;
      acc.totalConquiste += player.stats.conquiste;
      acc.totalTentativi += player.stats.tentativi;
      return acc;
    },
    { totalPali: 0, totalConquiste: 0, totalTentativi: 0 }
  );
};
