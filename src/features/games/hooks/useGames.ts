import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGameById } from "@/features/games/redux/getGameDetailSlice";

import type { RootState, AppDispatch } from "@/store/store";

export const useGame = (id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const game = useSelector((state: RootState) => state.game.game);
  const loading = useSelector((state: RootState) => state.game.loading);
  const error = useSelector((state: RootState) => state.game.error);
  // NOTE: Custom hook for fetching and accessing a single game by ID

  useEffect(() => {
        // NOTE: Fetches game data when component mounts or id changes

    dispatch(fetchGameById(id));
  }, [dispatch, id]);

  return { game, loading, error };
};
