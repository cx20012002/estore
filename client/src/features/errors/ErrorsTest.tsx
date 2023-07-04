import React, {useState} from 'react';
import {useAppDispatch} from "../../app/redux/store";
import {errorsApi} from "../../app/redux/services/errorsApi";
import ValidationError from "../../components/ValidationError";

const buttonStyles = "border border-neutral-400 p-3 w-full rounded hover:text-primary hover:border-primary transition duration-300";

function ErrorsTest() {
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState<string[]>([])
    return (
        <section>
            <h1 className={"text-2xl font-bold mb-10"}>Errors for testing purposes</h1>
            <div className={"flex justify-between gap-10"}>
                <button className={buttonStyles} onClick={() => {
                    dispatch(errorsApi.endpoints.get400Error.initiate())
                }}>Test 400 error
                </button>
                <button className={buttonStyles} onClick={() => {
                    dispatch(errorsApi.endpoints.get401Error.initiate())
                }}>Test 401 error
                </button>
                <button className={buttonStyles} onClick={() => {
                    dispatch(errorsApi.endpoints.get404Error.initiate())
                }}>Test 404 error
                </button>
                <button className={buttonStyles} onClick={() => {
                    dispatch(errorsApi.endpoints.get500Error.initiate())
                }}>Test 500 error
                </button>
                <button className={buttonStyles} onClick={async () => {
                    const {error: {data: errors}} = await dispatch(errorsApi.endpoints.get400ValidationError.initiate()) as any;
                    setErrors(errors);
                }}>Test validation error
                </button>
            </div>
            {errors.length > 0 && <ValidationError errors={errors}/>}
        </section>
    )
}

export default ErrorsTest;