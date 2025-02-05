'use client'
import {useForm} from "react-hook-form";
import React, {useState} from "react";
import {FormInput} from "@/components/common/inputs/FormInput";

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
    const formData = useForm();
    const {watch} = formData;
    const name = watch('name');
    const lastName = watch('lastName');
    const email = watch('email');
    const password = watch('password');

    const [formValues, setFormValues] = useState<initialFormTypes>(initialFormValues);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value})
    }
    return(
        <div className={'w-[350px] mx-auto'}>
            <div className='flex justify-center bg-blue-100 shadow-blue-500 shadow-md p-10 rounded-md'>
                <form className={'flex flex-col gap-3'}>
                    <FormInput id={'name'} label={'Name'} name={'name'} onChange={handleChange} type={'text'}
                               value={name}/>
                    <FormInput id={'lastName'} label={'Lastname'} name={'lastName'} onChange={handleChange}
                               type={'text'}
                               value={lastName}/>
                    <FormInput id={'email'} label={'E-mail'} name={'email'} onChange={handleChange} type={'text'}
                               value={email}/>
                    <FormInput id={'password'} label={'Password'} name={'password'} onChange={handleChange}
                               type={'password'} value={password}/>
                </form>
            </div>
        </div>
    )
}