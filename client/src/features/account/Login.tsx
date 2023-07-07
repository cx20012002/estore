import React from 'react';
import AppTextInput from "../../components/AppTextInput";
import {FieldValues, useForm} from "react-hook-form";
import LoadingButton from "../../components/LoadingButton";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useLoginMutation} from "../../app/redux/services/accountApi";
import {useLocation, useNavigate} from "react-router-dom";

interface Props {
    setIsOpen: (args: { source: string, open: boolean }) => void;
}

function Login({setIsOpen}: Props) {
    const [login, {isLoading}] = useLoginMutation();
    const validationSchema = yup.object({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required")
    } as FieldValues);

    const {control, handleSubmit, formState: {isValid, errors}, setError} = useForm<FieldValues>({
        resolver: yupResolver(validationSchema),
        mode: "all"
    });

    const onSubmit = async (data: FieldValues) => {
        try {
            await login(data).unwrap();
            setIsOpen({source: "", open: false});
        } catch (err: any) {
            setError('root.serverError', {type: err?.data?.status, message: err?.data?.detail})
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:w-full sm:max-w-sm flex justify-between">
                <h2 className="text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in <br/> to your account
                </h2>
                <img className="h-6 w-auto" src="/assets/logo.png" alt="Your Company"/>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <AppTextInput 
                        control={control} 
                        name={"username"} 
                        label={"Username"} 
                        className={'mt-3 rounded font-light bg-neutral-100 text-gray-800 text-sm border-none border-0 block w-full p-2.5 outline-none outline-0'}
                    />
                    <AppTextInput 
                        control={control} 
                        name={"password"} 
                        type={"password"} 
                        label={"Password"} 
                        className={'mt-3 rounded font-light bg-neutral-100 text-gray-800 text-sm border-none border-0 block w-full p-2.5 outline-none outline-0'}
                    />
                    <div>
                        <LoadingButton
                            disabled={!isValid}
                            isLoading={isLoading}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 transition-colors duration-150 disabled:opacity-50"
                        >
                            Sign in
                        </LoadingButton>
                    </div>
                    {errors.root &&
                        <span className={"text-sm text-red-600 py-1 px-5 inline-block rounded border border-red-600"}>
                            {errors.root?.serverError?.message}
                        </span>
                    }
                </form>
                <p className="mt-5 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <button
                        onClick={async () => {
                            setIsOpen({source: "login", open: false})
                            await new Promise(resolve => setTimeout(resolve, 500));
                            setIsOpen({source: "register", open: true})
                        }}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign up for better deals
                    </button>
                </p>
            </div>
        </div>
    )
}


export default Login;