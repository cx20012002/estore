import React from "react";

interface Props {
    [key: string]: any;

    className?: string;
}

export const StripeInput = ({component: Component, className, ...props}: Props) => {
    return (
        <div className={"w-full"}>
            <Component
                options={{style: {base: {"::placeholder": {color: '#a8acb7'}}}}}
                className={className}
                {...props}
            />
            {props.error && <div className="text-sm text-red-600 py-1 px-5 w-fit rounded border border-red-600 mt-2">{props.helperText}</div>}
        </div>
    )
}

