import React from 'react';
import {Order} from "../../app/models/order";
import {BasketItem} from "../../app/models/basket";
import {Link} from "react-router-dom";
import {currencyFormat} from "../../utils/scriptTools";
import {TiTick} from "react-icons/ti";

interface Props {
    order: Order;
}

function OrderDetails({order}: Props) {
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    return (
        <div className={"flex flex-col gap-10"}>
            <ul className={"flex flex-col gap-y-10"}>
                {(order.orderItems as BasketItem[]).map((item: BasketItem, index: number) => (
                    <div key={item.productId}>
                        <li className={"flex justify-between gap-10"}>
                            <Link to={`/catalog/${item.productId}`} className={"basis-2/12 w-full rounded-xl overflow-hidden"}>
                                <img src={item.pictureUrl} alt={"product thumbnail"}/>
                            </Link>
                            <div className={"basis-10/12 flex flex-col justify-between"}>
                                <div className={"flex justify-between"}>
                                    <div>
                                        <Link to={`/catalog/${item.productId}`}><h2>{item.name}</h2></Link>
                                        <p>{currencyFormat(item.price)}</p>
                                    </div>
                                    <div className={"flex items-center"}>
                                        <div className={"py-5 border-b border-neutral-200 w-24 text-center"}>
                                            {item.quantity}
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex items-center justify-between text-sm"}>
                                    <span className={"flex items-center"}>  
                                        <TiTick size={20} className={"text-green-500 mr-2"}/> In Stock
                                    </span>
                                    <span className={"font-bold"}>{currencyFormat(item.price * item.quantity)}</span>
                                </div>
                            </div>
                        </li>
                        {order.orderItems.length - 1 !== index && <hr className={"mt-10"}/>}
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default OrderDetails;