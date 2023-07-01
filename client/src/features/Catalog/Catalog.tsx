import React from 'react';
import {useGetProductsQuery} from "../../app/redux/services/productsApi";
import ProductList from "./ProductList";


function Catalog() {
    const {data: products, isLoading} = useGetProductsQuery();

    if (isLoading) return <div>Loading...</div>
    if (!products) return <div>No products</div>

    return (
        <>
            <section className={"mb-20"}>
                <img src={"/assets/shop_page_banner.png"} alt={"Shop Banner"}/>
            </section>
            <section className={"flex-row lg:flex gap-5"}>
                <div className={"md:w-1/5"}>Filter</div>
                <div className={"lg:w-4/5 w-full"}>
                    <ProductList products={products}/>
                </div>
            </section>
        </>
    )
}

export default Catalog;