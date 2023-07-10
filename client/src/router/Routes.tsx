import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/home/HomePage";
import Catalog from "../features/catalog/Catalog";
import ProductDetails from "../features/catalog/ProductDetails";
import ErrorsTest from "../features/errors/ErrorsTest";
import NotFoundPage from "../features/errors/NotFoundPage";
import ServerErrorPage from "../features/errors/ServerErrorPage";
import BasketPage from "../features/basket/BasketPage";
import AboutPage from "../features/about/AboutPage";
import RequireAuth from "./RequireAuth";
import CheckoutWrapper from "../features/checkout/CheckoutWrapper";
import ThankYouPage from "../features/checkout/ThankYouPage";
import Order from "../features/Order/Order";


export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {
                element: <RequireAuth/>, children: [
                    {path: 'checkout', element: <CheckoutWrapper/>},
                    {path: 'order', element: <Order/>},
                ]
            },
            {path: '/', element: <HomePage/>},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails/>},
            {path: 'basket', element: <BasketPage/>},
            {path: 'about', element: <AboutPage/>},
            {path: 'thank-you', element: <ThankYouPage/>},
            {path: 'not-found', element: <NotFoundPage/>},
            {path: 'server-error', element: <ServerErrorPage/>},
            {path: 'errors', element: <ErrorsTest/>},
            {path: '*', element: <Navigate to={'/not-found'}/>},
        ]
    }
]


export const router = createBrowserRouter(routes);