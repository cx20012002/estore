import React, {useEffect, useState} from 'react';
import AppTextInput from "../../components/AppTextInput";
import {FieldValues, useForm} from "react-hook-form";
import BasketSummary from "../basket/BasketSummary";
import {useGetBasketQuery} from "../../app/redux/services/basketApi";
import LoadingComponent from "../../components/LoadingComponent";
import {BasketItem} from "../../app/models/basket";
import {Link, useNavigate} from "react-router-dom";
import {currencyFormat} from "../../utils/scriptTools";
import {TiTick} from "react-icons/ti";
import {RadioGroup} from "@headlessui/react";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import AppRadioInput from "../../components/AppRadioInput";
import {useFetchAddressQuery} from "../../app/redux/services/accountApi";
import {useCreateOrderMutation} from "../../app/redux/services/OrderApi";
import AppCheckbox from "../../components/AppCheckbox";
import LoadingButton from "../../components/LoadingButton";
import {StripeElementType} from "@stripe/stripe-js";
import {StripeInput} from "../../components/StripeInput";
import {CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe} from "@stripe/react-stripe-js";


const inputStyle = "border border-neutral-200 w-full px-5 py-3 rounded outline-none";
const paymentOptions = [
    {name: 'Credit Card', value: 'creditCard'},
    {name: 'Cash on Delivery', value: 'cashOnDelivery'},
    {name: 'Online Transfer', value: 'onlineTransfer'}
]

function CheckoutPage() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const {data: basket, isLoading} = useGetBasketQuery();
    const {data: address} = useFetchAddressQuery();
    const [createOrder] = useCreateOrderMutation();
    const [cardState, setCardState] = useState<{
        elementError: { [key in StripeElementType]?: string }
    }>({elementError: {}});
    const [cardComplete, setCardComplete] = useState<any>({cardNumber: false, cardExpiry: false, cardCvc: false});
    const [shippingMethod, setShippingMethod] = useState('5');
    const [loading, setLoading] = useState(false);

    function onCardInputChange(event: any) {
        setCardState({
            ...cardState,
            elementError: {
                ...cardState.elementError,
                [event.elementType]: event.error?.message
            }
        })
        setCardComplete({...cardComplete, [event.elementType]: event.complete});
    }

    const validationSchema = yup.object({
        fullName: yup.string().required(),
        address1: yup.string().required(),
        city: yup.string().required(),
        zip: yup.string().required(),
        country: yup.string().required()
    } as FieldValues);

    const {control, handleSubmit, reset, formState: {isValid, isDirty}} = useForm({
        resolver: yupResolver(validationSchema),
        mode: "all"
    });
    
    
    const onSubmit = async (data: FieldValues) => {
        setLoading(true);
        const {nameOnCard} = data;
        if (!stripe || !elements) return;
        const cardElement = elements.getElement(CardNumberElement);
        const paymentResult = await stripe.confirmCardPayment(basket?.clientSecret!, {
            payment_method: {
                card: cardElement!,
                billing_details: {
                    name: nameOnCard,
                }
            }
        });

        if (paymentResult.paymentIntent?.status === 'succeeded') {
            const {nameOnCard, saveAddress, ...shippingAddress} = data;
            const orderNumber = await createOrder({saveAddress, shippingAddress});
            setLoading(false);
            navigate('/thank-you', {state: {orderNumber: orderNumber}});
        } else {
            setLoading(false);
        }
    }

    const submitDisabled = () => {
        return !cardComplete.cardNumber
            || !cardComplete.cardExpiry
            || !cardComplete.cardCvc
            || !isValid;
    }

    useEffect(() => {
        if (address) {
            reset(address);
        }
    }, [address, reset])

    if (isLoading) return <LoadingComponent/>;

    return (

        <form onSubmit={handleSubmit(onSubmit)}
              className={"flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden"}>
            <div className={"w-full flex flex-col text-sm gap-5 sm:px-16 px-10 py-20"}>
                <h1 className={"text-4xl font-bold"}>Checkout Form</h1>
                <hr className={"my-3"}/>
                <div className="space-y-4">
                    <h2 className={"text-base text-neutral-800"}>Shipping information</h2>
                    <AppTextInput control={control} name={"fullName"} label={"Full Name"} className={inputStyle}/>
                    <AppTextInput control={control} name={"address1"} label={"Address 1"} className={inputStyle}/>
                    <AppTextInput control={control} name={"address2"} label={"Address 2"} className={inputStyle}/>
                    <div className={"flex gap-4"}>
                        <AppTextInput control={control} name={"city"} label={"City"} className={inputStyle}/>
                        <AppTextInput control={control} name={"state"} label={"State"} className={inputStyle}/>
                    </div>
                    <div className={"flex gap-4"}>
                        <AppTextInput control={control} name={"zip"} label={"Zip"} className={inputStyle}/>
                        <AppTextInput control={control} name={"country"} label={"Country"} className={inputStyle}/>
                    </div>
                    <AppCheckbox name={"saveAddress"} control={control} label={"Save this information for next time"}
                                 disabled={!isDirty}/>
                </div>
                <hr className={"my-3"}/>
                <h2 className={"text-base text-neutral-800"}>Delivery Method</h2>
                <RadioGroup value={shippingMethod} onChange={setShippingMethod}
                            className={"flex justify-between gap-4"}>
                    <RadioGroup.Option value="5" className={"w-full cursor-pointer"}>
                        {({checked}) => (
                            <div
                                className={`w-full relative p-5 flex flex-col gap-5 rounded-lg border border-neutral-200 ${checked ? 'outline outline-2 outline-primary' : ''}`}>
                                <div className={"relative"}>
                                    <h3 className={"font-bold mb-1"}>Standard</h3>
                                    <p className={"text-neutral-600"}>4–10 business days</p>
                                    {checked && <TiTick size={18}
                                                        className={"absolute top-0 right-0 text-white bg-primary rounded-full p-0.5"}/>}
                                </div>
                                <AppRadioInput
                                    name="deliveryMethod"
                                    value={"5"}
                                    control={control}
                                    className={"w-full h-full top-0 left-0 absolute rounded-lg opacity-0 cursor-pointer"}
                                    defaultValue={'5'}
                                />
                                <span className={"font-bold"}>$5.00</span>
                            </div>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="16" className={"w-full cursor-pointer"}>
                        {({checked}) => (
                            <div
                                className={`w-full relative p-5 flex flex-col gap-5 rounded-lg border border-neutral-200 ${checked ? 'outline outline-2 outline-primary' : ''}`}>
                                <div className={"relative"}>
                                    <h3 className={"font-bold mb-1"}>Express</h3>
                                    <p className={"text-neutral-600"}>2–5 business days</p>
                                    {checked && <TiTick size={18}
                                                        className={"absolute top-0 right-0 text-white bg-primary rounded-full p-0.5"}/>}
                                </div>
                                <AppRadioInput
                                    name="deliveryMethod"
                                    value={"16"}
                                    control={control}
                                    className={"w-full h-full top-0 left-0 absolute rounded-lg opacity-0 cursor-pointer"}
                                />
                                <span className={"font-bold"}>$16.00</span>
                            </div>
                        )}
                    </RadioGroup.Option>
                </RadioGroup>
                <hr className={"my-3"}/>
                <h2 className={"text-base text-neutral-800"}>Payment</h2>
                <div className={"flex justify-between sm:flex-row flex-col"}>
                    {paymentOptions.map((option, index) => (
                        <div key={index}>
                            <AppRadioInput
                                className={"h-4 w-4 border-gray-300 text-primary focus:ring-indigo-500"}
                                name={"payment"}
                                control={control}
                                label={option.name}
                                value={option.value}
                                defaultValue={"creditCard"}
                            />
                        </div>
                    ))}
                </div>
                <AppTextInput control={control} name={"nameOnCard"} label={"Name on Card"} className={inputStyle}/>
                <StripeInput
                    onChange={onCardInputChange}
                    className={inputStyle}
                    error={!!cardState.elementError.cardNumber}
                    helperText={cardState.elementError.cardNumber}
                    component={CardNumberElement}
                />
                <div className={"flex gap-4"}>
                    <StripeInput
                        onChange={onCardInputChange}
                        className={`${inputStyle}`}
                        error={!!cardState.elementError.cardExpiry}
                        helperText={cardState.elementError.cardExpiry}
                        component={CardExpiryElement}
                    />
                    <StripeInput
                        onChange={onCardInputChange}
                        className={`${inputStyle}`}
                        error={!!cardState.elementError.cardCvc}
                        helperText={cardState.elementError.cardCvc}
                        component={CardCvcElement}
                    />
                </div>
            </div>
            <div className={"w-full flex flex-col gap-y-10 bg-[#F9FAFB] sm:px-16 px-10 py-20"}>
                {basket && (
                    <>
                        <div className={"flex flex-col gap-10"}>
                            <ul className={"flex flex-col gap-y-10"}>
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
                                                        <Link to={`/catalog/${item.productId}`}><h2>{item.name}</h2>
                                                        </Link>
                                                        <p className={"text-sm text-neutral-500"}>{item.brand} | {item.type}</p>
                                                        <p>{currencyFormat(item.price)}</p>
                                                    </div>
                                                    <div className={"flex items-center"}>
                                                        <div
                                                            className={"py-5 border-b border-neutral-200 w-24 text-center"}>
                                                            {item.quantity}
                                                        </div>
                                                    </div>
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
                            <BasketSummary basket={basket} isBasket={false}
                                           className={"bg-white border border-neutral-100"}/>
                            <LoadingButton
                                isLoading={loading}
                                type={"submit"}
                                disabled={submitDisabled()}
                                className={"bg-primary block text-center text-base text-white w-full py-3 rounded disabled:opacity-50"}
                            >
                                Place Order
                            </LoadingButton>
                        </div>
                    </>
                )}
            </div>
        </form>
    )
}

export default CheckoutPage;