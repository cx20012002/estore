import {baseApi} from "./baseApi";
import {Order} from "../../models/order";
import {setBasket} from "../persistSlice";
import {basketApi} from "./basketApi";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[], void>({
            query: () => `orders`,
        }),
        getOrder: builder.query<Order, string>({
            query: (id: string) => `orders/${id}`,
        }),
        createOrder: builder.mutation({
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
                await dispatch(setBasket(null));
            }
        }),
    })
})

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useCreateOrderMutation
} = orderApi;