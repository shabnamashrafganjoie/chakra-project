import { RawgResponse } from "@/features/games/types/game.types";
const API_KEY = "3d6c1fae19c3464fa0e8b2c9fc9bacc0";
const PAGE_SIZE = 20;
export const getGames = async (page: number): Promise<RawgResponse> => {
    const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${PAGE_SIZE}`
    );
    const data: RawgResponse = await res.json();
    return data;
};