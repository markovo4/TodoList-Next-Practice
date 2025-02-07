import {Api} from "@/lib/api";
import {useMutation} from "@tanstack/react-query";

export const useGetSecretKeyQuery = () => {
    return useMutation<SecretKeyResponse, Error, SecretKeyPayload>({
        mutationFn: async (payload) => {
            console.log("Sending Request:", payload);
            return Api.post(`/api/auth/two-factor/generate-key`, payload)
                .then((res) => res.data)
                .catch((error) => {
                    console.error("API Error:", error.response?.data || error);
                    throw error;
                });
        },
        onError: (error) => {
            console.error("Mutation Error:", error);
        },
        onSuccess: (data) => {
            console.log("Mutation Success:", data);
        },
    });
};

export type SecretKeyResponse = {
    secret: string;
    qr: string;
};

export type SecretKeyPayload = {
    userId: string;
};
