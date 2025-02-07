import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma"; // ✅ Import Prisma
import {generateToken} from "@/lib/jwt"; // ✅ Import JWT function
import {createHash} from "node:crypto"; // ✅ Use bcrypt for secure password comparison

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { toastMessage: "Email and password are required!", toastStatus: "error" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            return NextResponse.json(
                { toastMessage: "Wrong email or password!", toastStatus: "error" },
                { status: 401 } // 401: Unauthorized
            );
        }

        const isPasswordValid = createHash('sha256').update(password).digest('hex') === existingUser.password;


        if (!isPasswordValid) {
            return NextResponse.json(
                { toastMessage: "Wrong email or password!", toastStatus: "error" },
                { status: 401 }
            );
        }

        const token = generateToken({ userId: existingUser.id });

        return NextResponse.json(
            { token, user: existingUser, toastMessage: "Successful Login!", toastStatus: "success" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { toastMessage: "Server Error", toastStatus: "error" },
            { status: 500 }
        );
    }
};
