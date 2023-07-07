import {baseApi} from "./baseApi";
import {Basket} from "../../models/basket";
import {setBasket} from "../persistSlice";

export const basketApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query<Basket, void>({
            query: () => 'basket',
            onQueryStarted: async (args, {dispatch, queryFulfilled, requestId}) => {
                try {
                    const {data: basket} = await queryFulfilled;
                    dispatch(setBasket(basket));
                } catch (error) {
                    console.log(error);
                }
            },
            providesTags: ['Basket']
        }),
        addItems: build.mutation<Basket, { productId: number, quantity?: number }>({
            query: ({productId, quantity = 1}) => ({
                url: 'basket',
                params: {productId, quantity},
                method: 'POST'
            }),
            onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
                const {data: basket} = await queryFulfilled;
                if (basket){
                    await dispatch(basketApi.util.updateQueryData('getBasket', undefined, (draft) => {
                        draft.items = basket.items;
                    }));
                    await dispatch(setBasket(basket));
                }
            },
        }),
        removeItems: build.mutation<Basket, { productId: number, quantity?: number }>({
            query: ({productId, quantity = 1}) => ({
                url: 'basket',
                params: {productId, quantity},
                method: 'DELETE'
            }),
            onQueryStarted: async (args, {dispatch, queryFulfilled}) => {
                const {data: basket} = await queryFulfilled;
                await dispatch(basketApi.util.updateQueryData('getBasket', undefined, (draft) => {
                    draft.items = basket.items;
                }));
                await dispatch(setBasket(basket));
            }
        }),
    })
})

export const {useGetBasketQuery, useAddItemsMutation, useRemoveItemsMutation} = basketApi;