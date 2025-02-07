import {TwoFactorForm} from "@/components/common/forms/TwoFactor.form";

const Page = ()=>{
    return(
        <div className='max-w-[600px] bg-blue-400 mx-auto p-10 pb-20 rounded-md mt-20'>
            <div className='flex flex-col items-center gap-10'>
                <h1 className='font-bold bg-green-500 px-3 text-2xl shadow-blue-500 shadow-md'> Two-Factor Setup</h1>
                <TwoFactorForm/>
            </div>
        </div>
    )
}

export default Page;