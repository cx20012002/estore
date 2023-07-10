import {baseApi} from "./baseApi";
import {Order} from "../../models/order";
import {setBasket} from "../persistSlice";
import {basketApi} from "./basketApi";
import {Basket} from "../../models/basket";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => `orders`,
        }),
        getOrder: builder.query<Order, string>({
            query: (id: string) => `orders/${id}`,
        }),
        createOrder: builder.mutation<number, any>({
            query: (order: any) => ({
                url: `orders`,
                method: 'POST',
                body: order
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                await queryFulfilled;
                await dispatch(basketApi.util.updateQueryData('getBasket', undefined, (draft) => {
                    draft.items = [];
                }));
                await dispatch(setBasket(new Basket()));
            }
        }),
        createPaymentIntent: builder.mutation<any, void>({
            query: () => ({
                url: `payments`,
                method: 'POST'
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled}) => {
                const {data: basket} = await queryFulfilled;
                await dispatch(basketApi.util.updateQueryData('getBasket', undefined, (draft) => {
                    draft.paymentIntentId = basket.paymentIntentId;
                    draft.clientSecret = basket.clientSecret;
                }));
                dispatch(setBasket(basket));
            }
        }),
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useCreateOrderMutation,
    useCreatePaymentIntentMutation
} = orderApi;