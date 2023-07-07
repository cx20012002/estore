import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";

interface Props extends UseControllerProps {
    label?: string;
    className?: string;
    value?: string;
    defaultValue?: string;
    checked?: boolean;
}

function AppRadioInput(props: Props) {
    const { field, fieldState: { error } } = useController({
        ...props, defaultValue: props.defaultValue || ''
    });

    return (
        <div className={"flex items-center"}>
            <input
                {...field}
                type="radio"
                className={`${props.className} 
                 ${error ? "placeholder:text-red-300" : "placeholder:text-neutral-400"}`}
                value={props.value}
                checked={field.value === props.value}
            />

            {props.label && (
                <label className="ml-3 min-w-0 flex-1 text-[14px] leading-8 text-gray-700">
                    {props.label}
                </label>
            )}
        </div>
    );
}

export default AppRadioInput;