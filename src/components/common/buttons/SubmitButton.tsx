import {FC} from "react";

export const SubmitButton: FC<SubmitButtonProps> = ({ title, disabled})=>{
    return(
        <div>
                <button type={'submit'} className={'bg-indigo-700 font-bold text-md rounded-md px-2 py-1 w-[100%] hover:bg-blue-900 hover:shadow-blue-900 shadow-blue-500 shadow-md transition'} disabled={disabled}>
                    {title}
                </button>
        </div>
    )
}

type SubmitButtonProps = {
    title:string;
    disabled: boolean;
}