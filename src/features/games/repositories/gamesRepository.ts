import { RawgResponse } from "../types/game.types"
import { getGames } from "../services/gamesService";
export const gamesRepository = {
    fetchGames: async (page: number): Promise<RawgResponse> => {
        return await getGames(page);
    },
};