import {NextRequest, NextResponse} from "next/server";
import {verifyTotp} from "@/lib/twoFactor";
import {generateToken} from "@/lib/jwt";

export const POST = async (req: NextRequest)=>{
    const body = await req.json();
    const {userId, userCode} = body;

    try{
        const user = await prisma?.user.findFirst({
            where: {id: userId}
        })

        if(!user){
            return NextResponse.json(
                {toastMessage: "No such user", toastStatus: "error" },
                {status: 404}
            )
        }

        if(!user.twoFa){
            return NextResponse.json(
                {toastMessage: "No 2-Fa is found for current user", toastStatus: "error" },
                {status: 400}
            )
        }

        const isValid = verifyTotp({secret: user.twoFaCode, userCode})

        if(!isValid){
            return NextResponse.json(
                {toastMessage: "Invalid Totp code", toastStatus: "error" },
                {status: 400}
            )
        }
        const token = generateToken({ userId: user.id });

        return NextResponse.json(
            { token, userId: user.id, toastMessage: "Successful Login!", toastStatus: "success", redirect: '/' },
            { status: 200 }
        );

    }catch(error){
        console.error(error)
        return NextResponse.json(
            {toastMessage: "Server error", toastStatus: "error" },
            {status: 500})

    }
}