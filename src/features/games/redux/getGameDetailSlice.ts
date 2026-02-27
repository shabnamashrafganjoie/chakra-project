import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Game, GameDetailState } from "@/features/games/types/game.types";
import { getGameById } from "@/features/games/services/gamesService";

const initialState: GameDetailState = {
  loading: false,
  game: null,
  error: null,
};

export const fetchGameById = createAsyncThunk<Game,number>(
  "Games/getGameById",
  async (id:number) => {
        // NOTE: Fetch a single game by its ID

    return await getGameById(id);
  }
);

const gameDetailSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameById.pending, (state) => {
        state.loading = true;
        state.error = null;
                // NOTE: game is not reset here, previous game data persists until new data arrives

      })
      .addCase(fetchGameById.fulfilled, (state, action) => {
        state.loading = false;
        state.game = action.payload;
      })
      .addCase(fetchGameById.rejected, (state, action) => {
        state.loading = false;
        state.game = null;
        state.error = action.error.message || "Failed to fetch game";
      });
  },
});

export default gameDetailSlice.reducer;
