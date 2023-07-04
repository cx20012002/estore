import {baseApi} from "./baseApi";
import {Product} from "../../models/product";
import {PaginatedResponse} from "../../models/pagination";

export const productsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        getProducts: build.query<PaginatedResponse<Product[]>, string>({
            query: (productParams: string) => ({
                url: 'products',
                params: productParams
            }),
            transformResponse: (products: Product[], meta: any) => {
                const pagination = JSON.parse(meta.response.headers.get('Pagination'));
                return new PaginatedResponse(products, pagination);
            },
            providesTags: ['Products']
        }),
        getProduct: build.query<Product, string>({
            query: (id) => `products/${id}`,
            providesTags: ['Product']
        }),
        getFilters: build.query<any, void>({
            query: () => 'products/filters',
        }),
    })
})

export const {useGetProductsQuery, useGetProductQuery, useGetFiltersQuery} = productsApi;