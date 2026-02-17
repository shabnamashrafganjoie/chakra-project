import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// TypeScript type
export interface Game {
    id: number;
    name: string;
    rating: number;
    released: string;
    genres: { id: number; name: string }[];
    background_image: string | null;
    [key: string]: any;
}

interface RawgResponse {
    results: Game[];
    count: number;
}

interface GameState {
    loading: boolean;
    results: Game[];
    error: string | null;
    currentPage: number;
    totalPages: number;
    count: number;
}

const initialState: GameState = {
    loading: false,
    results: [],
    error: null,
    currentPage: 1,
    totalPages: 0,
    count: 0,
};

// Async thunk برای گرفتن بازی‌ها
export const fetchGames = createAsyncThunk<RawgResponse, { page: number }>(
    "games/fetchGames",
    async ({ page }) => {
        const res = await fetch(`https://api.rawg.io/api/games?key=3d6c1fae19c3464fa0e8b2c9fc9bacc0&page=${page}&page_size=20`);
        const data: RawgResponse = await res.json();
        return data;
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
