import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../app/layout/App";
import HomePage from "../features/Home/HomePage";
import Catalog from "../features/Catalog/Catalog";
import ProductDetails from "../features/Catalog/ProductDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails/>},

        ]
    }
]


export const router = createBrowserRouter(routes);