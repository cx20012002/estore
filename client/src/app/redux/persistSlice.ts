import {createSlice} from "@reduxjs/toolkit";
import {Basket} from "../models/basket";

interface PersistState {
    basket: Basket | undefined;
}

const initialState: PersistState = {
    basket: undefined,
}


export const persistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        }
    }
});

export const {setBasket} = persistSlice.actions;
