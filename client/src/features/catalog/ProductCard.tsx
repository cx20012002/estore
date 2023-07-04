import React from 'react';
import {Product} from "../../app/models/product";
import {Link} from "react-router-dom";
import {currencyFormat} from "../../utils/scriptTools";
import {useAddItemsMutation} from "../../app/redux/services/basketApi";
import LoadingButton from "../../components/LoadingButton";

interface Props {
    product: Product;
}

function ProductCard({product}: Props) {
    const [addItem, {isLoading}] = useAddItemsMutation();
    return (
        <div className={"bg-white bg-opacity-50"}>
            <Link to={`/catalog/${product.id}`}>
                <div>
                    <img src={product.pictureUrl} alt={product.name} className={"lg:h-[420px] md:h-[350px] w-full object-cover"}/>
                </div>
            </Link>

            <div className={"p-5"}>
                <div className={"flex justify-between"}>
                    <h3>{product.name}</h3>
                    <span className={"font-light"}>{currencyFormat(product.price)}</span>
                </div>
                <div className={"text-sm text-gray-500 mt-2 flex items-center gap-3"}>
                    <LoadingButton
                        isLoading={isLoading}
                        iconSize={15}
                        content={"Add to Cart"}
                        onClick={() => addItem({productId: product.id, quantity: 1})}
                        className={"hover:text-primary w-20"}
                    >Add to Cart</LoadingButton> | <Link to={`/catalog/${product.id}`} className={"hover:text-primary"}>View</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;