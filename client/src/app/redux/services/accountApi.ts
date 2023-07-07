import {baseApi} from "./baseApi";
import {setBasket, setUser} from "../persistSlice";
import {User} from "../../models/user";
import {FieldValues} from "react-hook-form";
import {getRouter} from "../../../utils/scriptTools";
import {store} from "../store";
import {basketApi} from "./basketApi";
import {ShippingAddress} from "../../models/order";

export const accountApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, FieldValues>({
            query: (body) => ({
                url: 'account/login',
                method: 'POST',
                body
            }),
            onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    const {basket, ...user} = data;
                    if (basket) dispatch(setBasket(basket));
                    await dispatch(setUser(user));
                    await localStorage.setItem('user', JSON.stringify(user));
                    await getRouter().navigate('/catalog');
                } catch (error) {
                    return;
                }
            }
        }),
        register: builder.mutation<User, FieldValues>({
            query: (body) => ({
                url: 'account/register',
                method: 'POST',
                body
            }),
            onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    const {basket, ...user} = data;
                    if (basket) dispatch(setBasket(basket));
                    await dispatch(setUser(user));
                    await localStorage.setItem('user', JSON.stringify(user));
                    await getRouter().navigate('/');
                } catch (error) {
                    return;
                }
            }
        }),
        fetchCurrentUser: builder.query<User, void>({
            query: () => 'account/currentUser',
            onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
                try {
                    const {data} = await queryFulfilled;
                    const {basket, ...user} = data;
                    if (basket) dispatch(setBasket(basket));
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(setUser(user));
                } catch (error) {
                    return;
                }
            }
        }),
        fetchAddress: builder.query<ShippingAddress, void>({
            query: () => 'account/savedAddress',
        }),
    })
})

export const logout = async () => {
    await localStorage.removeItem('user');
    await store.dispatch(setUser(undefined)); // clear global user state
    await store.dispatch(setBasket(undefined)); // clear global basket state
    await store.dispatch(basketApi.util.resetApiState()); // clear basket cache
    await getRouter().navigate('/');
}

export const {useLoginMutation, useRegisterMutation, useFetchAddressQuery} = accountApi;