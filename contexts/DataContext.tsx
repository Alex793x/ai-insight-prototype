import { TopicComments } from '@/types/TopicComments';
import React, { ReactNode, createContext } from 'react';
import { OpportunitiesDataSet } from "@/data/opportunities_comments";
import { LearningsDataSet } from '@/data/learnings_comments';

interface DataContextType {
    opportunityData: TopicComments[];
    operationData: TopicComments[];
    learningsData: TopicComments[];
    gapsData: TopicComments[];
}
const defaultDataContextType: DataContextType = {
    opportunityData: OpportunitiesDataSet,
    operationData: OpportunitiesDataSet,
    learningsData: LearningsDataSet,
    gapsData: OpportunitiesDataSet,
    
}
export const DataContext = createContext<DataContextType>(defaultDataContextType);


export const DataContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DataContext.Provider value={defaultDataContextType}>
            {children}
        </DataContext.Provider>
    );
};