import { TopicComments } from "@/types/TopicComments";
import React, { ReactNode, createContext } from "react";
// import { OPPORTUNITIES_DATASET } from "../data/overviews/opportunitiesOverview";
import { LEARNING_OVERVIEW } from "../data/overviews/learningsOverview";
import { OPERATIONS_OVERVIEW } from "../data/overviews/operationsOverview";
import { GAPS_OVERVIEW } from "../data/overviews/gapsOverview";
import { OPPORTUNITIES_OVERVIEW2 } from "../data/overviews/opportunitiesOverview2";
import { LCA_OVERVIEW } from "../data/overviews/lcaOverview";
console.log("GAPS:::   ", GAPS_OVERVIEW);
interface DataContextType {
  opportunityData: TopicComments[];
  operationData: TopicComments[];
  learningsData: TopicComments[];
  gapsData: TopicComments[];
  lcaData: TopicComments[];
}
const defaultDataContextType: DataContextType = {
  opportunityData: OPPORTUNITIES_OVERVIEW2,
  operationData: OPERATIONS_OVERVIEW,
  learningsData: LEARNING_OVERVIEW,
  gapsData: GAPS_OVERVIEW,
  lcaData: LCA_OVERVIEW,
};
export const DataContext = createContext<DataContextType>(
  defaultDataContextType
);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <DataContext.Provider value={defaultDataContextType}>
      {children}
    </DataContext.Provider>
  );
};
