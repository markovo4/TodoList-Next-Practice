import {Api} from "@/lib/api";
import {registerValidationSchema} from "@/utils/validationSchemas/register.validationSchema";
import {z} from "zod";
import {loginValidationSchema} from "@/utils/validationSchemas/login.validationSchema";
import {setCookie} from "cookies-next";

export const regUser = async (_prevState: unknown, data: FormData)=>{
    const {name, lastName, email, password} = Object.fromEntries(data.entries()) as Record<string, string>;

    try{
        const validatedData = registerValidationSchema.parse({name, lastName, email, password})
        const response =  await Api.post('/api/auth/register', validatedData);

        if(response.status === 201){
            return {
                toastMessage: response.data.toastMessage,
                toastStatus: response.data.toastStatus,
                redirect: '/auth/login'
            }
        }
    }catch(error){
        if(error instanceof z.ZodError){
            console.error(error)
            const errors = error.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                name: errors.name?.[0] || undefined,
                lastName: errors.lastName?.[0] || undefined,
                toastMessage: 'Bad Attempt',
                toastStatus: 'info',
                redirect: null
            };
        }

        if ((error as { status: number }).status === 409) {
            return {
                email: undefined,
                password: undefined,
                name: undefined,
                lastName: undefined,
                toastMessage: 'User with such E-mail exists!',
                toastStatus: 'error',
                redirect: null
            };
        }

        return {
            email: undefined,
            password: undefined,
            name: undefined,
            lastName: undefined,
            toastMessage: "Unexpected server error occurred!",
            toastStatus: 'error',
            redirect: null
        };
    }
}

export const logUser = async (_prevState: unknown, data: FormData)=>{
    const {email, password} = Object.fromEntries(data.entries()) as Record<string, string>;

    try{
        const validatedData = loginValidationSchema.parse({email, password})
        const response = await Api.post('/api/auth/login', validatedData);

        if(response.status === 200){
            const token = response.data.token;

            setCookie("session", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60, // 1 hour
            });
            return {
                toastMessage: "Successful Login",
                toastStatus: "success",
                redirect: "/",
            };
        }


    }catch(error){
        if(error instanceof z.ZodError){
            const errors = error.flatten().fieldErrors;
            return {
                email: errors.email?.[0] || undefined,
                password: errors.password?.[0] || undefined,
                toastMessage: 'Bad Attempt',
                toastStatus: 'info',
                redirect: null
            };
        }

        if ((error as { status: number }).status === 409) {
            return {
                email: undefined,
                password: undefined,
                toastMessage: 'User with such E-mail exists!',
                toastStatus: 'error',
                redirect: null
            };
        }

        return {
            email: undefined,
            password: undefined,
            toastMessage: "Unexpected server error occurred!",
            toastStatus: 'error',
            redirect: null
        };
    }
}