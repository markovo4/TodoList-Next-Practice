import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {createHash} from "node:crypto";

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { email, password } = body;

        // Validate request body
        if (!email || !password) {
            return NextResponse.json(
                { toastMessage: "Email and password are required!", toastStatus: "error" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = createHash("sha256").update(password).digest("hex");

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { toastMessage: "User with this email already exists!", toastStatus: "error" },
                { status: 409 }
            );
        }

        // Create new user
        const user = await prisma.user.create({
            data: { ...body, password: hashedPassword },
        });

        return NextResponse.json(
            { user, userId: user.id, toastMessage: "Successful registration!", toastStatus: "success" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json(
            { toastMessage: "Server error. Please try again later.", toastStatus: "error" },
            { status: 500 }
        );
    }
};
