import React, { ReactNode, createContext } from "react";
import { Summary } from "../types/Summary";
import { OPPORTUNITIES_SUMMARY } from "../data/summaries/opportunitiesSummary";
import { OPERATIONS_SUMMARY } from "../data/summaries/operationsSummary";
import { LEARNINGS_SUMMARY } from "../data/summaries/learningsSummary";
import { GAPS_SUMMARY } from "../data/summaries/gapsSummary";
import { LCA_SUMMARY } from "../data/summaries/lcaSummary";

interface SummaryContextType {
  opportunitySummary: Summary[];
  operationSummary: Summary[];
  learningsSummary: Summary[];
  gapsSummary: Summary[];
  lcaSummary: Summary[];
}
const defaultSummaryContextType: SummaryContextType = {
  opportunitySummary: OPPORTUNITIES_SUMMARY,
  operationSummary: OPERATIONS_SUMMARY,
  learningsSummary: LEARNINGS_SUMMARY,
  gapsSummary: GAPS_SUMMARY,
  lcaSummary: LCA_SUMMARY,
};
export const SummaryContext = createContext<SummaryContextType>(
  defaultSummaryContextType
);

export const SummaryDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SummaryContext.Provider value={defaultSummaryContextType}>
      {children}
    </SummaryContext.Provider>
  );
};
