import { configureStore  } from "@reduxjs/toolkit";
import {getAllProductsReducer,getProductDetailReducer} from "./slices/productsSlice";
import {getAllGamesReducer} from "./slices/gamesSlice"
const store = configureStore({
    reducer:{
       products: getAllProductsReducer,
        games: getAllGamesReducer,
        product:getProductDetailReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;