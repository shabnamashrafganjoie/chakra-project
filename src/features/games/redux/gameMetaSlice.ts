import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getGenres,
  getParentPlatforms,
} from "@/features/games/services/gameMetaService";

interface MetaState {
  genres: any[];
  platforms: any[];
  loading: boolean;
}

const initialState: MetaState = {
  genres: [],
  platforms: [],
  loading: false,
  
};

export const fetchMetaData = createAsyncThunk(
  "games/fetchMetaData",
  async () => {
        // NOTE: Fetching both genres and platforms in parallel using Promise.all

    const [genres, platforms] = await Promise.all([
      getGenres(),
      getParentPlatforms(),
    ]);

    return { genres, platforms };
  }
);

const metaSlice = createSlice({
  name: "gameMeta",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetaData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMetaData.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload.genres;
        state.platforms = action.payload.platforms;
      });
  },
});

export default metaSlice.reducer;