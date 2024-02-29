"use client";
import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';
import { Topic } from '@/types/Topic';

interface SelectedSummaryTopicContextType {
    dataTopic: Topic;
    setDataTopic: Dispatch<SetStateAction<Topic>>;
    dataSubTopic: string | null;
    setDataSubTopic: Dispatch<SetStateAction<string>>;
}

const defaultSelectedSummaryTopicContextType: SelectedSummaryTopicContextType = {
    dataTopic: Topic.OPPORTUNITIES,
    setDataTopic: () => {},
    dataSubTopic: null,
    setDataSubTopic: () => {},
};

export const SelectedSummaryTopicContext = createContext<SelectedSummaryTopicContextType>(defaultSelectedSummaryTopicContextType);

export const SelectedSummaryTopicContextProvider = ({ children }: { children: ReactNode }) => {
    const [dataTopic, setDataTopic] = useState<Topic>(Topic.OPPORTUNITIES);
    const [dataSubTopic, setDataSubTopic] = useState<string>("");
    return (
        <SelectedSummaryTopicContext.Provider value={{ dataTopic, setDataTopic, dataSubTopic, setDataSubTopic }}>
            {children}
        </SelectedSummaryTopicContext.Provider>
    );
};