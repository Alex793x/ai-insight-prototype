"use client";
import * as React from "react";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { DataContextProvider } from "@/contexts/DataContext";
import { SelectedSummaryTopicContextProvider } from "@/contexts/SelectedSummaryJson";
import { useRouter } from "next/navigation";

export function CustomNextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <SelectedSummaryTopicContextProvider>
        <DataContextProvider>{children}</DataContextProvider>
      </SelectedSummaryTopicContextProvider>
    </NextUIProvider>
  );
}
