'use client'
import {SubmitButton} from "@/components/common/buttons/SubmitButton";
import {useGetSecretKeyQuery} from "@/utils/query/useGetSecretKey.query";
import {getCookie} from "cookies-next";
import {useState} from "react";
import {QRCodeCanvas} from "qrcode.react";
import {CopyIcon} from "@/styles/tsx-icons/common-icons/copy.icon";

export const TwoFactorForm = () => {
    const { mutateAsync: getSecretKey, isPending } = useGetSecretKeyQuery();
    const userId =  getCookie('userId')
    const [qrCode, setQrCode] = useState<string>('')
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const secretKey = await getSecretKey(userId);

            setQrCode(secretKey?.data.secret.qr)
        } catch (error) {
            console.error("Failed to fetch secret key:", error);
        }
    };



    return (
        <div className="w-[350px] mx-auto">
            <div className="flex flex-col bg-blue-100 rounded-md shadow-blue-500 shadow-md p-10">
                <SubmitButton title="Enable 2-FA" disabled={isPending} action={handleClick} />

                {qrCode &&
                    <div className='flex  gap-5 p-5 rounded-md shadow shadow-gray-950 w-[100%] bg-white mx-auto mt-10'>
                    <QRCodeCanvas value={`${qrCode || undefined}`}
                               size={100}
                               bgColor="#fff"
                               fgColor="#000000"/>
                        <p className='text-gray-500 '>Or copy the code <CopyIcon width={20} height={20}/></p>
                    </div>}
            </div>
        </div>
    );
};
