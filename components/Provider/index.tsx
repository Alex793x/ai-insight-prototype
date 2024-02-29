"use client";
import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { DataContextProvider } from "@/contexts/DataContext";

export function CustomNextUIProvider({ children }: { children: React.ReactNode }) {
    // 2. Wrap NextUIProvider at the root of your app
    return (
        <NextUIProvider>
            <DataContextProvider>

                {children}

            </DataContextProvider>
        </NextUIProvider>
    );
}