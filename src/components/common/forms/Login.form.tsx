'use client'
import {FormInput} from "@/components/common/inputs/FormInput";
import React, {useState} from "react";
import {useForm} from "react-hook-form";

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

    const formData = useForm()
    const {watch} = formData;
    const email = watch('email')
    const password = watch('password')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value})
    }

    return(
        <div className={'w-[350px] mx-auto'}>
            <div className='flex justify-center bg-blue-100 rounded-md shadow-blue-500 shadow-md p-10'>
                <form className={'flex flex-col gap-3'}>
                    <FormInput value={email} onChange={handleChange} label={'E-mail'} id={'email'} type={'text'} name={'email'}/>
                    <FormInput value={password} onChange={handleChange} label={'Password'} id={'password'} type={'password'} name={'password'}/>
                </form>
            </div>
        </div>
    )
}