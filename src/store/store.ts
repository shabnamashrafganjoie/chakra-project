import { configureStore  } from "@reduxjs/toolkit";
import productsReducer from "./slices/getAllProductsSlice";
import gamesReducer from "./slices/getAllGamesSlice"
const store = configureStore({
    reducer:{
       products: productsReducer,
        games: gamesReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;