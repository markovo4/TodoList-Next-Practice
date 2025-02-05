import Link from "next/link";
import {FC} from "react";

export const RedirectButton: FC<RedirectButtonProps> = ({path, title})=>{
    return(
        <div>
            <Link href={path}>

            <button className={'bg-indigo-700 font-bold text-md rounded-md px-2 py-1 w-[100%] hover:bg-blue-900 hover:shadow-blue-900 shadow-blue-500 shadow-md transition'}>
                {title}
            </button>
            </Link>

        </div>
    )
}

type RedirectButtonProps = {
    path: string,
    title:string
}