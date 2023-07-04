import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import ErrorsTest from "../features/errors/ErrorsTest";
import NotFoundPage from "../features/errors/NotFoundPage";
import ServerErrorPage from "../features/errors/ServerErrorPage";
import BasketPage from "../features/basket/BasketPage";
import CheckoutPage from "../features/checkout/CheckoutPage";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails/>},
            {path: 'basket', element: <BasketPage/>},
            {path: 'checkout', element: <CheckoutPage/>},
            {path: 'not-found', element: <NotFoundPage/>},
            {path: 'server-error', element: <ServerErrorPage/>},
            {path: 'errors', element: <ErrorsTest/>},
            {path: '*', element: <Navigate to={'/not-found'}/>}
        ]
    }
]


export const router = createBrowserRouter(routes);