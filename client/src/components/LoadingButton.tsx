import React, {ReactNode} from 'react';
import {AiOutlineLoading} from "react-icons/ai";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading: boolean;
    onClick?: (e:any) => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string;
    name?:string
    iconSize?: number;
}

function LoadingButton({isLoading, onClick, children, className, disabled, label, name, iconSize = 20}: Props) {
    return (
        <button
            name={name}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={className}>
            {
                isLoading ?
                    <div className={"flex items-center justify-center"}>
                        <i className={"fa fa-spinner fa-spin mr-2"}></i>
                        {label}<AiOutlineLoading size={iconSize} className={"animate-spin w-full"}/>
                    </div> : children
            }

        </button>
    )
}

export default LoadingButton;