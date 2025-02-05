'use client'

import {FC, ReactNode} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./queryClient";

export const ReactQueryProvider: FC<ReactQueryProviderProps> = ({children})=>{
    return(
        <QueryClientProvider client={queryClient}>
            {children}
            </QueryClientProvider>

    )
}

export type ReactQueryProviderProps = {
    children: ReactNode
}