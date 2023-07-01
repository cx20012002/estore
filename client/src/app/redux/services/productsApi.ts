import {baseApi} from "./baseApi";
import {Product} from "../../models/product";

const productsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getProducts: build.query<Product[], void>({
            query: () => 'products',
        }),
        getProduct: build.query<Product, string>({
            query: (id) => `products/${id}`,
        })
    })
})

export const {useGetProductsQuery, useGetProductQuery} = productsApi;