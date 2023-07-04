import React from 'react';
import {useAddItemsMutation, useGetBasketQuery, useRemoveItemsMutation} from "../../app/redux/services/basketApi";
import LoadingComponent from "../../components/LoadingComponent";
import {TiTick} from "react-icons/ti";
import {IoCloseOutline} from "react-icons/io5";
import {Link} from "react-router-dom";
import BasketSummary from "./BasketSummary";
import {BasketItem} from "../../app/models/basket";
import {currencyFormat} from "../../utils/scriptTools";

function BasketPage() {
    const {data: basket, isLoading} = useGetBasketQuery();
    const [addItem, {isLoading: addLoading}] = useAddItemsMutation();
    const [removeItem, {isLoading: removeLoading}] = useRemoveItemsMutation();
    if (isLoading) return <LoadingComponent logo={"/assets/logo.png"}/>;
    if (!basket) return <h1>no basket</h1>;

    return (
        <div className={"bg-white px-10 py-20 rounded-xl shadow-lg relative"}>
            {(addLoading || removeLoading) && <LoadingComponent partial={true}/>}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                Shopping Cart
            </h1>
            <hr/>
            <div className={"flex flex-col justify-between lg:flex-row gap-10 mt-10"}>
                <ul className={"basis-8/12 flex flex-col gap-y-10"}>
                    {basket.items.map((item: BasketItem, index: number) => (
                        <div key={item.productId}>
                            <li className={"flex justify-between gap-10"}>
                                <Link to={`/catalog/${item.productId}`}
                                      className={"basis-3/12 w-full rounded-xl overflow-hidden"}>
                                    <img src={item.pictureUrl} alt={"product thumbnail"}/>
                                </Link>
                                <div className={"basis-9/12 flex flex-col justify-between"}>
                                    <div className={"flex justify-between"}>
                                        <div>
                                            <Link to={`/catalog/${item.productId}`}><h2>{item.name}</h2></Link>
                                            <p className={"text-sm text-neutral-500"}>{item.brand} | {item.type}</p>
                                            <p>{currencyFormat(item.price)}</p>
                                        </div>
                                        <div className={"flex items-center"}>
                                            <button onClick={() => addItem({productId: item.productId})}
                                                    className={"text-lg"}>+
                                            </button>
                                            <div className={"py-5 border-b border-neutral-200 w-24 text-center"}>
                                                {item.quantity}
                                            </div>
                                            <button onClick={() => removeItem({productId: item.productId})} className={"text-lg"}>-</button>
                                        </div>
                                        <button onClick={() => removeItem({productId: item.productId, quantity: item.quantity})} className={"self-baseline"}>
                                            <IoCloseOutline size={22} className={"text-neutral-400 hover:text-primary transition-colors duration-300"}/>
                                        </button>
                                    </div>
                                    <div className={"flex items-center justify-between text-sm"}>
                                        <span className={"flex items-center"}>
                                            <TiTick size={20} className={"text-green-500 mr-2"}/> In Stock
                                        </span>
                                        <span
                                            className={"font-bold"}>{currencyFormat(item.price * item.quantity)}</span>
                                    </div>
                                </div>
                            </li>
                            {basket.items.length - 1 !== index && <hr className={"mt-10"}/>}
                        </div>
                    ))}
                </ul>
                <div className={"basis-4/12"}>
                    <BasketSummary basket={basket}/>
                </div>
            </div>
        </div>
    )
}

export default BasketPage;