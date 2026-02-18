import { configureStore  } from "@reduxjs/toolkit";
import {getAllProductsReducer} from "./slices/productsSlice";
import {getAllGamesReducer} from "./slices/gamesSlice"
const store = configureStore({
    reducer:{
       products: getAllProductsReducer,
        games: getAllGamesReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;