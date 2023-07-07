import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";

interface Props extends UseControllerProps {
    label?: string;
    disabled?: boolean;
}

function AppCheckbox(props: Props) {
    const {field} = useController({...props, defaultValue: false})
    return (
        <div className={"flex items-center text-neutral-800 py-2"}>
            <input
                {...props}
                {...field}
                checked={field.value}
                type="checkbox"
                disabled={props.disabled}
                className="mr-2 focus:ring-0 disabled:border-gray-400 rounded"/>
            <span className={`text-sm ${props.disabled && 'text-gray-400'}`}>{props.label}</span>
        </div>
    )
}

export default AppCheckbox;