import {baseApi} from "./baseApi";

export const errorsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        get401Error: build.query<any, void>({
            query: () => 'buggy/unauthorised'
        }),
        get400Error: build.query<any, void>({
            query: () => 'buggy/bad-request'
        }),
        get404Error: build.query<any, void>({
            query: () => 'buggy/not-found'
        }),
        get500Error: build.query<any, void>({
            query: () => 'buggy/server-error'
        }),
        get400ValidationError: build.query<any, void>({
            query: () => 'buggy/validation-error'
        }),
    })
})