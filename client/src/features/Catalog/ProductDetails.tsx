import React from 'react';
import {useParams} from "react-router-dom";
import {useGetProductQuery} from "../../app/redux/services/productsApi";
import {RadioGroup} from "@headlessui/react";

function ProductDetails() {
    const {id} = useParams<{ id: string }>();
    const {data:product, isLoading} = useGetProductQuery(id as string);
    const [plan, setPlan] = React.useState('startup');
    
    if (isLoading) return <div>Loading...</div>
    if (!product) return <div>No product</div>
    
    console.log(plan)
    
    return (
        <>
            {product.name}
            <RadioGroup value={plan} onChange={setPlan} className={"flex gap-5"}>
                <RadioGroup.Option value="startup">
                    {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>Startup</span>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="business">
                    {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>Business</span>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="enterprise">
                    {({ checked }) => (
                        <span className={checked ? 'bg-blue-200' : ''}>Enterprise</span>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
        </>
    )
}

export default ProductDetails;