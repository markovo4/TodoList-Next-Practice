import {Api} from "@/lib/api";
import {useMutation} from "@tanstack/react-query";

export const useGetSecretKeyQuery = () => {
    return useMutation<SecretKeyResponse, Error, SecretKeyPayload>({
        mutationFn: (payload) => {
            return Api.post(`/api/auth/two-factor-auth`,  payload );
        },
        onError: (error) => {
            console.error(error)
        },
        onSuccess: () => {
        },
    })
}

export type SecretKeyResponse = {
    secret: string;
    qr: string;
}

export type SecretKeyPayload = {
    userId: string
}


