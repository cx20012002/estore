import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {useGetProductQuery} from "../../app/redux/services/productsApi";
import {RadioGroup} from "@headlessui/react";
import {BiWorld} from "react-icons/bi";
import {AiOutlineDollarCircle} from "react-icons/ai";
import LoadingComponent from "../../components/LoadingComponent";
import {currencyFormat} from "../../utils/scriptTools";
import {useAddItemsMutation} from "../../app/redux/services/basketApi";
import LoadingButton from "../../components/LoadingButton";
import {colors, sizes} from "../../constants/content";

function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const {data: product, isLoading} = useGetProductQuery(id as string);
    const [colorSelected, setColorSelected] = useState(colors[0]);
    const [sizeSelected, setSizeSelected] = useState(sizes[0]);
    const [quantity, setQuantity] = useState(1);
    const [addItem, {isLoading: addLoading}] = useAddItemsMutation();
    
    if (isLoading) return <LoadingComponent logo={'/assets/logo.png'}/>;
    if (!product) return <div>No product</div>

    function handleInputChange(e: any) {
        if (e.target.value > 0) setQuantity(parseInt(e.target.value));
    }

    return (
        <section className={"flex flex-col lg:flex-row gap-20 bg-white px-10 py-20 shadow-lg rounded-lg"}>
            <div className={"w-full overflow-hidden rounded-2xl"}>
                <img src={product.pictureUrl} alt="Product Gallery" className={"h-full object-cover"}/>
            </div>
            <div className={"w-full flex flex-col gap-y-10"}>
                <div className={"flex justify-between text-2xl"}>
                    <h1>{product.name}</h1>
                    <h2>{currencyFormat(product.price)}</h2>
                </div>

                <RadioGroup value={colorSelected} onChange={setColorSelected}>
                    <RadioGroup.Label className={"inline-block my-2"}>Color</RadioGroup.Label>
                    <div className="flex gap-5">
                        {colors.map((color) => (
                            <RadioGroup.Option
                                key={color}
                                value={color}
                                className={({checked}) => `p-3 rounded-full w-8 h-8 cursor-pointer ${color} 
                                ${checked ? 'ring-gray-500 ring-1 ring-offset-2' : ''}
                                `}
                            >
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

                <RadioGroup value={sizeSelected} onChange={setSizeSelected}>
                    <RadioGroup.Label className={"inline-block my-2"}>Size</RadioGroup.Label>
                    <div className="flex gap-5 justify-start sm:justify-between sm:flex-nowrap flex-wrap">
                        {sizes.map((size) => (
                            <RadioGroup.Option
                                key={size}
                                value={size}
                                className={({active, checked}) => `p-3 sm:w-full w-1/5 rounded-lg cursor-pointer border border-gray-200 text-center
                                ${checked ? 'bg-primary text-white' : ''}
                                `}
                            >
                                {size}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>

                <div className={"space-y-3"}>
                    <h3>Description</h3>
                    <p className={"text-neutral-500 text-sm leading-6"}>{product.description}</p>
                </div>

                <div className={"space-y-3"}>
                    <h3>Fabric & Care</h3>
                    <ul className={"text-neutral-500 text-sm leading-6 list-disc list-inside"}>
                        <li>Only the best materials</li>
                        <li>Ethically and locally made</li>
                        <li>Pre-washed and pre-shrunk</li>
                        <li>Machine wash cold with similar colors</li>
                    </ul>
                </div>

                <div className={"flex justify-between gap-5"}>
                    <div className={"w-full px-5 py-8 bg-neutral-50 border border-neutral-200 rounded-xl text-center"}>
                        <BiWorld color={"#999"} size={25} className={"w-full"}/>
                        <p>International delivery</p>
                        <p className={"text-neutral-500"}>Get your order in 2 years</p>
                    </div>
                    <div className={"w-full px-5 py-8 bg-neutral-50 border border-neutral-200 rounded-xl text-center"}>
                        <AiOutlineDollarCircle color={"#999"} size={25} className={"w-full"}/>
                        <p>Loyalty rewards</p>
                        <p className={"text-neutral-500"}>Don't look at other tees</p>
                    </div>
                </div>

                <div className={"space-y-5"}>
                    <label className={"block"} htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        onChange={handleInputChange}
                        className={"text-center py-2 rounded-lg border border-neutral-200 outline-none w-full"}
                        value={quantity}/>
                    <LoadingButton
                        onClick={() => addItem({productId: product.id, quantity})}
                        isLoading={addLoading}
                        disabled={addLoading}
                        className={"bg-primary text-white h-12 rounded-lg w-full block disabled:opacity-50"}
                    >
                        Add to Cart
                    </LoadingButton>
                </div>
            </div>
        </section>
    )
}

export default ProductDetails;