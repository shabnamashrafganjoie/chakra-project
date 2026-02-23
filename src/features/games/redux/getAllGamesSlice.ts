import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Game, RawgResponse } from "../types/game.types";
import { GamePaginationList, RawgResponse } from "@/features/games/types/game.types";
import { getGames } from "@/features/games/services/gamesService";
// TypeScript type


export interface FetchGamesParams {
  page: number;
  search?: string;
  genres?: number[];
  parent_platforms?: number[];
}

const initialState: GamePaginationList = {
    loading: false,
    results: [],
    error: null,
    next:null,
    previous:null,
    count:0,
}


export const fetchGames = createAsyncThunk<
  RawgResponse,     
//   FetchGamesParams
  { page: number , search ?: string, genres?: number[],
    parent_platforms?: number[] }
>(
  "games/fetchGames",
  async ({ page,search = "", genres = [], parent_platforms = [] }) => {
    return await getGames(page,search, genres, parent_platforms);
  }
);
const GamesSlice = createSlice({
    name: "Games",
    initialState,
    reducers: {
        resetGames: (state) => {
            state.results = [];
            state.count = 0;
     

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload.results;
                state.count = action.payload.count;
                state.next = action.payload.next;
                state.previous= action.payload.previous;

                
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.results = [];
                state.error = action.error.message || "Failed to fetch games";
            });
    },
});

export const { resetGames } = GamesSlice.actions;
export default GamesSlice.reducer;
