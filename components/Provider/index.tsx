"use client";
import * as React from "react";

import { NextUIProvider } from "@nextui-org/react";
import { DataContextProvider } from "@/contexts/DataContext";
import { SummaryDataProvider } from "../../contexts/SummaryData";

export function CustomNextUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextUIProvider>
      <DataContextProvider>
        <SummaryDataProvider>{children}</SummaryDataProvider>
      </DataContextProvider>
    </NextUIProvider>
  );
}
