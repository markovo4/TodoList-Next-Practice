import React, {Dispatch, FC, SetStateAction} from "react";
import clsx from "clsx";
import {EyeClosedIcon} from "@/styles/tsx-icons/form-icons/eyeClosed.icon";
import {EyeOpenedIcon} from "@/styles/tsx-icons/form-icons/eyeOpened.icon";

export const CodeInput: FC<CodeInput> = ({
                                              value,
                                              onChange,
                                              errorMessage,
                                              id,
                                              type,
                                              name,
                                              label,
                                              isHidden = true,
                                              showPassword,
    action
                                          }) => {
    return (
        <div className="flex flex-col h-[55px] w-[40px] relative ">
            <input
                className={clsx(
                    "border-2 rounded-md bg-white text-black px-3 py-1 outline-none", // Always have a border
                    errorMessage
                        ? "border-red-500 focus:border-red-600" // Red border when there's an error
                        : "border-gray-300 focus:border-blue-500" // Default border color
                )}
                type={isHidden ? type : 'text'}
                id={id.toString()}
                maxLength={1}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={label}
                onPaste={action}
            />

            {showPassword && <button className='absolute text-black bg-blue-100 border-2 border-transparent rounded-e-sm w-[32px] h-[32px] right-0.5 top-0.5 flex justify-center items-center'
                                     onClick={(e) => {e.preventDefault(); showPassword(!isHidden)}}
            >
                {isHidden ? <EyeClosedIcon height={22} width={25}/> : <EyeOpenedIcon height={36} width={36}/>}
            </button>}

            {errorMessage && (
                <small className="text-red-600 font-medium text-xs mt-0.5 ml-1">
                    {errorMessage}
                </small>
            )}
        </div>
    );
};

export type CodeInput = {
    value: string;
    onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage?: string;
    label: string;
    id: string | number;
    type: string;
    name: string;
    showPassword?: Dispatch<SetStateAction<boolean>>;
    isHidden?: boolean;
    action: (e: React.ClipboardEvent<HTMLInputElement>) => void;
};
