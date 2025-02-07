'use client'
import {SubmitButton} from "@/components/common/buttons/SubmitButton";
import {useGetSecretKeyQuery} from "@/utils/query/useGetSecretKey.query";
import {getCookie} from "cookies-next";
import {useState} from "react";
import {QRCodeCanvas} from "qrcode.react";
import {copyToClipboard} from "@/utils/functions/copyToClipboard";
import {CopyIcon} from "@/styles/tsx-icons/common-icons/copy.icon";
import {FormInput} from "@/components/common/inputs/FormInput";
import {useForm} from "react-hook-form";

export const TwoFactorForm = () => {
    const { mutateAsync: getSecretKey, isPending } = useGetSecretKeyQuery();
    const userId =  getCookie('userId')
    const [qrCode, setQrCode] = useState<QrCodeType>()

    const formData = useForm();
    const {watch} = formData;
    const twoFa = watch('toFa');

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const secretKey = await getSecretKey(userId);

            setQrCode(secretKey?.data.secret)
        } catch (error) {
            console.error("Failed to fetch secret key:", error);
        }
    };

    return (
        <div className="w-[400px] mx-auto">
            <div className="flex flex-col bg-blue-100 rounded-md shadow-blue-500 shadow-md p-10">
                <SubmitButton title="Enable 2-FA" disabled={isPending} action={handleClick} />

                {qrCode?.qr &&
                    <div className='flex items-start gap-5 p-5 rounded-md shadow shadow-gray-950 w-[100%] bg-white mx-auto mt-10'>
                        <QRCodeCanvas value={`${qrCode.qr || undefined}`}
                                      size={100}
                                      bgColor="#fff"
                                      fgColor="#000000"/>
                        <div className='flex justify-center items-center gap-3'>
                        <p className='text-gray-500'>Or copy the code</p>
                            <button onClick={() => copyToClipboard(qrCode.secret)}
                                    className={'p-0.5  rounded-sm border border-gray-200 '}>
                                <CopyIcon width={15} height={15}/>
                            </button>
                        </div>
                        <FormInput value={twoFa} onChange={} label={'Two-Factor code'} id={'twoFa'} type={'twoFa'} name={'twoFa'}/>

                    </div>}
            </div>
        </div>
    );
};

type QrCodeType = {
    qr: string;
    secret: string;
}
