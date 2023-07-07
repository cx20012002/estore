import React from 'react';
import {Basket, BasketItem} from "../../app/models/basket";
import {currencyFormat} from "../../utils/scriptTools";
import {Link} from "react-router-dom";

interface Props {
    basket: Basket;
    className?: string;
    isBasket?: boolean;
}

function BasketSummary({basket, className, isBasket = true}: Props) {
    const subTotal = basket.items.reduce((sum: number, item: BasketItem) => (sum + item.price * item.quantity), 0) ?? 0;
    const deliveryFee = subTotal > 10000 ? 0 : 500;

    return (
        <div className={`w-full bg-[#F9FAFB] rounded-lg p-10 text-lg ${className}`}>
            Order Summery
            <table className="w-full text-sm text-left text-gray-500 mb-2">
                <tbody>
                <tr className="border-b">
                    <th scope="row"
                        className="py-4 font-normal whitespace-nowrap">
                        Subtotal
                    </th>
                    <td className="py-4 text-right">
                        {currencyFormat(subTotal)}
                    </td>
                </tr>
                <tr className="border-b">
                    <th scope="row"
                        className="py-4 font-normal whitespace-nowrap">
                        Shipping Estimate
                    </th>
                    <td className="py-4 text-right">
                        {currencyFormat(deliveryFee)}
                    </td>
                </tr>
                <tr className="border-b">
                    <th scope="row"
                        className="py-4 font-normal whitespace-nowrap">
                        Tax Estimate
                    </th>
                    <td className="py-4 text-right">
                        {currencyFormat((subTotal + deliveryFee) * 0.15)}
                    </td>
                </tr>
                <tr>
                    <th scope="row"
                        className="py-4 font-medium text-base text-neutral-800 whitespace-nowrap">
                        Order Total
                    </th>
                    <td className="py-4 text-right">
                        {currencyFormat(subTotal + deliveryFee)}
                    </td>
                </tr>
                </tbody>
            </table>
            {isBasket && <Link to={"/checkout"}
                               className={"bg-primary block text-center text-base text-white w-full py-3 rounded"}>Checkout</Link>}
        </div>
    )
}

export default BasketSummary;