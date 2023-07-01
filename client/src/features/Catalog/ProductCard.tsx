import React from 'react';
import {Product} from "../../app/models/product";
import {Link} from "react-router-dom";

interface Props {
    product: Product;
}
function ProductCard({product}: Props) {
    return (
        <Link to={`/catalog/${product.id}`}>
            <div>
                <img src={product.pictureUrl} alt={product.name} className={"h-[500px] w-full object-cover"}/>
            </div>
            <div className={"p-3"}>
                <div className={"flex justify-between"}>
                    <h3 className={"text-lg"}>{product.name}</h3>
                    <span className={"text-lg font-light"}>${(product.price/100).toFixed(2)}</span>
                </div>
                <span className={"text-sm text-gray-500"}><i>3 Sizes available</i></span>
            </div>
            
        </Link>
        
        
    )
}

export default ProductCard;