import {createSlice} from "@reduxjs/toolkit";
import {Basket} from "../models/basket";
import {User} from "../models/user";

interface PersistState {
    basket: Basket | null;
    user: User | null;
    triggerModal: boolean;
}

const initialState: PersistState = {
    basket: null,
    user: null,
    triggerModal: false
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
        },
        setTriggerModal: (state, action) => {
            state.triggerModal = action.payload;
        }
    }
});

export const {setBasket, setUser, setTriggerModal} = persistSlice.actions;
