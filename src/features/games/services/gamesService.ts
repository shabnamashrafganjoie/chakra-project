import { Game } from "@/features/games/types/game.types";
import { fetchAllGames,fetchGame } from "@/features/games/repositories/gamesRepository";

export const getGames = async (page: number): Promise<{games:Game[],count:number}> => {
  const data = await fetchAllGames(page);

  return {
    games: data.results,
    count: data.count
  };};



  export const getGameById = async (id: number): Promise<Game> => {
  
    return await fetchGame(id);
  };
  