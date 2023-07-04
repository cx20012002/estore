import {BaseQueryFn, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {toast} from "react-toastify";
import {getRouter} from "../../../utils/scriptTools";

const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
    const response = await fetchBaseQuery({
        baseUrl: 'https://localhost:7174/api/',
        credentials: 'include'
    })(args, api, extraOptions);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (response.error) {
        const error = response.error as any;
        switch (error.status) {
            case 400:
                if (error.data.errors) {
                    const modalStateErrors = [];
                    for (const key in error.data.errors) {
                        if (error.data.errors[key]) {
                            modalStateErrors.push(error.data.errors[key]);
                        }
                    }
                    response.error.data = modalStateErrors.flat();
                } else{
                    toast.error(error.data.title);
                }
                break;
            case 401:
                toast.error('Unauthorised');
                break;
            case 404:
                await getRouter().navigate('/not-found');
                break;
            case 500:
                toast.error(error.data.title);
                await getRouter().navigate('/server-error', {state: {error: error.data}});
                break;
            default:
                console.log('default error');
                break;
        }
    }

    return response;
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery,
    tagTypes: ['Basket', 'Products', 'Product'],
    endpoints: () => ({})
})