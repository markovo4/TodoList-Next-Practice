'use client'
import {FormInput} from "@/components/common/inputs/FormInput";
import React, {useActionState, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {toast, TypeOptions} from "react-toastify";
import {useRouter} from "next/navigation";
import {logUser} from "@/app/api/actions";
import {SubmitButton} from "@/components/common/buttons/SubmitButton";

const initialValues = {
    email: '',
    password: ''
}

type initialValuesTypes = {
    email: string,
    password: string
}

export const LoginForm = ()=>{
    const [formValues, setFormValues] = useState<initialValuesTypes>(initialValues)
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const notify = () => toast(`${state?.toastMessage}`, {type: state?.toastStatus as TypeOptions});
    const router = useRouter();

    const formData = useForm()
    const {watch} = formData;
    const email = watch('email')
    const password = watch('password')

    const [ state, action, pending] = useActionState(logUser, null)


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value})
    }

    useEffect(() => {
        if (!pending && state?.toastMessage) {
            notify();
        }

        if (state?.redirect) {
            return router.push(state.redirect);
        }
    }, [pending, state]);

    return(
        <div className={'w-[350px] mx-auto'}>
            <div className='flex justify-center bg-blue-100 rounded-md shadow-blue-500 shadow-md p-10'>
                <form className={'flex flex-col gap-3'} action={action}>
                    <FormInput
                        value={email}
                        onChange={handleChange}
                        label={'E-mail'}
                        id={'email'}
                        type={'text'}
                        name={'email'}
                        errorMessage={state?.email}
                    />

                    <FormInput
                        id={'password'}
                        label={'Password'}
                        name={'password'}
                        onChange={handleChange}
                        type={'password'}
                        value={password}
                        isHidden={isHidden}
                        showPassword={setIsHidden}
                        errorMessage={state?.password}
                    />

                    <SubmitButton title={'Login'} disabled={pending}/>

                </form>
            </div>
        </div>
    )
}