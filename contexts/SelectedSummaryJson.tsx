"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Topic } from "@/types/Topic";

interface SelectedSummaryTopicContextType {
  dataTopic: Topic;
  setDataTopic: Dispatch<SetStateAction<Topic>>;
  dataSubTopic: string | null;
  setDataSubTopic: Dispatch<SetStateAction<string>>;
  isLCA: boolean;
  setIsLCA: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultSelectedSummaryTopicContextType: SelectedSummaryTopicContextType =
  {
    dataTopic: Topic.OPPORTUNITIES,
    setDataTopic: () => {},
    dataSubTopic: null,
    setDataSubTopic: () => {},
    isLCA: false,
    setIsLCA: () => {},
  };

export const SelectedSummaryTopicContext =
  createContext<SelectedSummaryTopicContextType>(
    defaultSelectedSummaryTopicContextType
  );

export const SelectedSummaryTopicContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dataTopic, setDataTopic] = useState<Topic>(Topic.OPPORTUNITIES);
  const [dataSubTopic, setDataSubTopic] = useState<string>("");
  const [isLCA, setIsLCA] = useState<boolean>(false);
  return (
    <SelectedSummaryTopicContext.Provider
      value={{
        dataTopic,
        setDataTopic,
        dataSubTopic,
        setDataSubTopic,
        isLCA,
        setIsLCA,
      }}
    >
      {children}
    </SelectedSummaryTopicContext.Provider>
  );
};
