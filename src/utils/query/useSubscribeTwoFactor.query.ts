import {Api} from "@/lib/api";
import {useMutation} from "@tanstack/react-query";

export const useSubscribeTwoFactorQuery = () => {
    return useMutation<SubscribeTwoFactorResponse, Error, SubscribeTwoFactorPayload>({
        mutationFn: async (payload) => {
            console.log("Sending Request:", payload);
            return Api.put(`/api/auth/two-factor/subscribe`, payload)
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

export type SubscribeTwoFactorResponse = {
    toastMessage: string;
    toastStatus: "success" | "error";
    redirect: string | null;
};

export type SubscribeTwoFactorPayload = {
    userId: string;
    secret: string;
};
