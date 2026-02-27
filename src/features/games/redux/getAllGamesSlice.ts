import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GamePaginationList, RawgResponse } from "@/features/games/types/game.types";
import { getGames } from "@/features/games/services/gamesService";
// TypeScript type


export interface FetchGamesParams {
  page?: number;
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
  FetchGamesParams | undefined   // Allow undefined as well
>(
  "games/fetchGames",
  async (params = {}) => {   // Default value is empty object
    const { page = 1, search = "", genres = [], parent_platforms = [] } = params;
    return await getGames(page, search, genres, parent_platforms);
  }
);

const GamesSlice = createSlice({
    name: "Games",
    initialState,
    reducers: {
        resetGames: (state) => {
            state.results = [];
            state.count = 0;
                 // NOTE: next and previous are not reset - might cause inconsistency


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
                // NOTE: This replaces results instead of appending - suitable for new searches/filters

                
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
