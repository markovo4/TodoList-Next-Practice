import {prisma} from '@/lib/prisma';
import {NextRequest, NextResponse} from "next/server";

export const PUT = async(req: NextRequest)=>{
    const body = await req.json();
    const {userId, secret} = body;
    try{
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                twoFaCode: secret,
                twoFa: true
            }
        });

        if(!user){
            return NextResponse.json(
                { toastMessage: "Invalid user credentials!", toastStatus: "error" },
                {status: 404}
            )
        }

        return NextResponse.json(
            {user, toastMessage: "New Secret Key generated", toastStatus: "success" },
            {status: 201}
        )

    }catch (error){
        return NextResponse.json(
            {toastMessage: "Server error", toastStatus: "error" },
            {status: 500}
        )
    }
}