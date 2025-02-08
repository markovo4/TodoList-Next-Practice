'use client'
import React, {useState} from "react";
import {CodeInput} from "@/components/common/inputs/CodeInput";
import {SubmitButton} from "@/components/common/buttons/SubmitButton";
import {Api} from "@/lib/api";
import {getCookie, setCookie} from "cookies-next";
import {toast, TypeOptions} from "react-toastify";
import {useRouter} from "next/navigation";

export const TwoFaVerifyForm = ()=>{
    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
    const userId = getCookie('userId');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const {value, id} = e.target;
        const index = parseInt(id, 10);

        const newValues = [...inputValues];
        newValues[index] = value;
        setInputValues(newValues);

        if(value.length === 1){
            const nextInput = document.getElementById((index + 1).toString()) as HTMLInputElement;
            if(nextInput){
                nextInput.focus();
            }
        } else if(value.length === 0){
            const prevInput = document.getElementById((index - 1).toString()) as HTMLInputElement;
            if(prevInput){
                prevInput.focus();
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pastedText = e.clipboardData.getData('text');
        const newValues = [...inputValues];

        for(let i = 0; i < pastedText.length; i++){
            if(i + 1 > 6){
                break
            }
            if(pastedText[i]){
                newValues[i] = pastedText[i];
            }
        }
        setInputValues(newValues)
    }

    const handleSubmit =  async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        try {
            const userCode = inputValues.join('');
            const response = await  Api.post('/api/auth/two-factor/verify',{userId, userCode})
                .then(res => res.data)
                .catch(error => error.response.data)

            if(response?.toastMessage){
                toast(`${response?.toastMessage}`, {type: response?.toastStatus as TypeOptions});
            }

            if(response?.redirect){
                setCookie("session", response?.token, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60*60
                });

                setCookie("userId", userId, {
                    httpOnly: false,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60*60
                });
                router.push(response?.redirect)
            }



        }catch (error){
            console.error(error)
        }
    }

    return (
        <div className={'w-[350px] mx-auto'}>
            <div className='flex justify-center bg-blue-100 shadow-blue-500 shadow-md p-10 rounded-md'>
                <form className={'flex flex-col gap-5'}>
                    <div className={'flex gap-2'}>
                        {inputValues.map((item, i)=>{
                            return (<CodeInput key={i} id={i} label={item} onChange={handleChange} name={item} type={'text'} value={item} action={handlePaste}/>)
                        })
                        }
                    </div>
                    {!inputValues.includes('') && <SubmitButton title={'Send'} disabled={false} action={handleSubmit}/>}
                </form>
            </div>
        </div>
    )
}