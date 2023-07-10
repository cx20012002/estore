import React, {useEffect} from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useCreatePaymentIntentMutation} from "../../app/redux/services/OrderApi";
import LoadingComponent from "../../components/LoadingComponent";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_8ZmjzNPdXjFOsST3K8RuHmBH00Xvtu2Bov');

function CheckoutWrapper() {
    const [createPaymentIntent, {isLoading}] = useCreatePaymentIntentMutation();

    useEffect(() => {
        createPaymentIntent();
    }, [createPaymentIntent])

    if (isLoading) return <LoadingComponent/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}

export default CheckoutWrapper;