'use client'
import {useForm} from "react-hook-form";
import React, {useActionState, useEffect, useState} from "react";
import {FormInput} from "@/components/common/inputs/FormInput";
import {regUser} from "@/app/api/actions";
import {SubmitButton} from "@/components/common/buttons/SubmitButton";
import {useRouter} from "next/navigation";
import {toast, TypeOptions} from "react-toastify";

const initialFormValues={
    name: '',
    lastName: '',
    email: '',
    password: ''
}

type initialFormTypes={
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export const RegisterForm = ()=>{
    const notify = () => toast(`${state?.toastMessage}`, {type: state?.toastStatus as TypeOptions});
    const router = useRouter();

    const formData = useForm();
    const {watch} = formData;
    const name = watch('name');
    const lastName = watch('lastName');
    const email = watch('email');
    const password = watch('password');

    const [formValues, setFormValues] = useState<initialFormTypes>(initialFormValues);
    const [isHidden, setIsHidden] = useState<boolean>(true)
    const [ state, action, pending] = useActionState(regUser, null)

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
            <div className='flex justify-center bg-blue-100 shadow-blue-500 shadow-md p-10 rounded-md'>
                <form className={'flex flex-col gap-3'} action={action}>
                    <FormInput
                        id={'name'}
                        label={'Name'}
                        name={'name'}
                        onChange={handleChange}
                        type={'text'}
                        value={name}
                        errorMessage={state?.name}
                    />
                    <FormInput
                        id={'lastName'}
                        label={'Lastname'}
                        name={'lastName'}
                        onChange={handleChange}
                        type={'text'}
                        value={lastName}
                        errorMessage={state?.lastName}
                    />
                    <FormInput
                        id={'email'}
                        label={'E-mail'}
                        name={'email'}
                        onChange={handleChange}
                        type={'text'}
                        value={email}
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
                    <SubmitButton title={'Register'} disabled={pending}/>
                </form>
            </div>
        </div>
    )
}