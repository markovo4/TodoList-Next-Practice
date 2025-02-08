import {Api} from "@/lib/api";
import {useMutation} from "@tanstack/react-query";
import {toast, TypeOptions} from "react-toastify";

export const useSubscribeTwoFactorQuery = () => {
    return useMutation<SubscribeTwoFactorResponse, Error, SubscribeTwoFactorPayload>({
        mutationFn: async (payload) => {
            return Api.put(`/api/auth/two-factor/subscribe`, payload)
                .then((res) => res.data)
                .catch((error) => {
                    console.error("API Error:", error.response?.data || error);
                    throw error;
                });
        },
        onError: (error) => {
            toast(`Mutation Error:${error}`, {type: 'error' as TypeOptions})
            console.error("Mutation Error:", error);
        },
        onSuccess: () => {
            toast(`Two-Fa subscribed `, {type: 'success' as TypeOptions})
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
