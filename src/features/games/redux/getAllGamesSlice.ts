import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { Game, RawgResponse } from "../types/game.types";
import { GameState, RawgResponse } from "@/features/games/types/game.types";
import { getGames } from "@/features/games/services/gamesService";
// TypeScript type




const initialState: GameState = {
    loading: false,
    results: [],
    error: null,
    currentPage: 1,
    totalPages: 0,
    count: 0,
};


export const fetchGames = createAsyncThunk<RawgResponse, { page: number }>(
    "games/fetchGames",
    async ({ page }) => {
        return await getGames(page);
    }
);


const GamesSlice = createSlice({
    name: "Games",
    initialState,
    reducers: {
        resetGames: (state) => {
            state.results = [];
            state.currentPage = 1;
            state.totalPages = 0;
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
                state.currentPage = action.meta.arg.page || 1;
                state.totalPages = Math.ceil(action.payload.count / 20); // 20 بازی در هر صفحه
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
