import { Game, RawgResponse } from "../types/game.types"
const API_KEY = "3d6c1fae19c3464fa0e8b2c9fc9bacc0";
const PAGE_SIZE = 21;
// export const fetchAllGames = async (page: number, search: string = ""): Promise<RawgResponse> => {
//     const res = await fetch(
//         `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${PAGE_SIZE}&search=${encodeURIComponent(search)}&search_exact=${true}&search_precise=${true}`
//     );

//     const data: RawgResponse = await res.json();
//     console.log(data)
//     return data;
// };


export const fetchAllGames = async (
  page: number,
  search: string = "",
  genres: number[] = [],
  parent_platforms: number[] = []
): Promise<RawgResponse> => {
  const res = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${PAGE_SIZE}&search=${encodeURIComponent(search)}&search_exact=${true}&search_precise=${true}${genres.length ? `&genres=${genres.join(",")}` : ""}${parent_platforms.length ? `&parent_platforms=${parent_platforms.join(",")}` : ""}`
  );

  const data: RawgResponse = await res.json();
  console.log(data);
  console.log("GENRES:", genres);
console.log("PLATFORMS:", parent_platforms);
  return data;
};


export const fetchGame = async (id: number): Promise<Game> => {
  const res = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  const data: Game = await res.json();
  return data;
};

