import {RedirectButton} from "@/components/common/buttons/RedirectButton";

const Page = ()=>{
    return(
        <div className='flex justify-center w-full '>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='pt-10 mb-10 font-bold text-2xl '>
                    Authentication Page
                </h1>
                <div className={'bg-blue-400 flex flex-col gap-3 w-[500px] px-20 py-10 rounded-2xl justify-start'}>
                    <RedirectButton path={`/auth/register`} title={`Register`}/>
                    <RedirectButton path={`/auth/login`} title={'Login'}/>
                </div>
            </div>
        </div>
    )
}

export default Page;