import { configureStore  } from "@reduxjs/toolkit";
import {getAllProductsReducer,getProductDetailReducer} from "./slices/productsSlice";
import {getAllGamesReducer, getGameDetailReducer, gameMetaReducer} from "./slices/gamesSlice"
const store = configureStore({
    reducer:{
       products: getAllProductsReducer,
        games: getAllGamesReducer,
        product:getProductDetailReducer,
        game: getGameDetailReducer,
        gameMeta: gameMetaReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;