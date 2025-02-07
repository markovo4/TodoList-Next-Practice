import {prisma} from '@/lib/prisma';
import {NextRequest, NextResponse} from "next/server";
import {subscribeTwoFactorAuth} from "@/lib/twoFactor";

export const POST = async(req: NextRequest)=>{
    const body = await req.json();
    const {userId} = body;
    try{
        const userEmail = await prisma.user.findFirst({
            where: {id: userId}
        })

        if(!userEmail){
            return NextResponse.json(
                { toastMessage: "Invalid user credentials!", toastStatus: "error" },
                {status: 404}
            )
        }

        const secret = subscribeTwoFactorAuth({
            name: 'Todo App',
            account: userEmail.email
        })

        if(!secret){
            return NextResponse.json(
                {toastMessage: "Error generating secret key", toastStatus: "error" },
                {status: 500}
            )
        }

        return NextResponse.json(
            {secret, toastMessage: "New Secret Key generated", toastStatus: "success" },
            {status: 201}
        )

    }catch (error){
        console.error(error)
        return NextResponse.json(
            {toastMessage: "Server error", toastStatus: "error" },
            {status: 500}
        )
    }
}