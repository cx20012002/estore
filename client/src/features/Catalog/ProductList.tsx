import React from 'react';
import {Product} from "../../app/models/product";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

function ProductList({products}: Props) {
    return (
        <ul className={"grid xl:grid-cols-3 lg:grid-cols-2 gap-8"}>
            {products.map((product: Product) => (
                <li key={product.id} className={"rounded-xl overflow-hidden border"}>
                    <ProductCard product={product}/>
                </li>
            ))}
        </ul>
    )
}

export default ProductList;