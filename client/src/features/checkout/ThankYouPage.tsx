import React from 'react';
import {useLocation} from "react-router-dom";

function ThankYouPage() {
    const {state} = useLocation();
    if (state === null) return <h1>No Order</h1>
    console.log(state)
    return (
        <>
            <h1>Thank you - we have received your payment</h1>
            <p>Your order number is #{state.orderNumber.data}. We have not emailed your order confirmation, and will not send you an update when your order has shipped as this is a fake store!</p>
        </>
    )
}

export default ThankYouPage;