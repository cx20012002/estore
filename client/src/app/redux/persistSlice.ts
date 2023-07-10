import {createSlice} from "@reduxjs/toolkit";
import {Basket} from "../models/basket";
import {User} from "../models/user";

interface PersistState {
    basket: Basket | null;
    user: User | null;
}

const initialState: PersistState = {
    basket: new Basket(),
    user: null,
}


export const persistSlice = createSlice({
    name: 'persist',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const {setBasket, setUser} = persistSlice.actions;
