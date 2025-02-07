import {FC} from "react";
import clsx from "clsx";

export const SubmitButton: FC<SubmitButtonProps> = ({ title, disabled, action})=>{

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
        if(action){
            action(e);
        }
        console.log(1)
    }
    return(
        <div>
                <button
                    type={'submit'}
                    className={clsx(disabled ? 'bg-gray-500' : 'bg-indigo-700' , ' font-bold text-md rounded-md px-2 py-1 w-[100%] hover:bg-blue-900 hover:shadow-blue-900 shadow-blue-500 shadow-md transition')}
                    disabled={disabled}
                    onClick={handleClick}
                >
                    {title}
                </button>
        </div>
    )
}

type SubmitButtonProps = {
    title:string;
    disabled: boolean;
    action?: (e: React.MouseEvent<HTMLButtonElement>)=> void;
}