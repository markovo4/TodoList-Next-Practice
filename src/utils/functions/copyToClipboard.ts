import {toast} from "react-toastify";

export const copyToClipboard = (value?: string | number)=>{
    if(value){
        navigator.clipboard
            .writeText(value.toString())
            .then(()=> toast(`Copied to clipboard`, {type: 'success'}))
    }
}