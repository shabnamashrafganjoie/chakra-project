import { Game } from "@/features/games/types/game.types";
import { fetchAllGames,fetchGame } from "@/features/games/repositories/gamesRepository";
import { RawgResponse } from "@/features/games/types/game.types";

export const getGames = async (
  page: number, search: string = "", genres?: number[],
  parent_platforms?: number[]
): Promise<RawgResponse> => {
  return await fetchAllGames(page,search,genres, parent_platforms);
};


  export const getGameById = async (id: number): Promise<Game> => {
  
    return await fetchGame(id);
  };
  
