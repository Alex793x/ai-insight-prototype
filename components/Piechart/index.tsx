"use client";
import React, { useContext } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { TopicComments } from "@/types/TopicComments";
import { Topic } from "@/types/Topic";
import { useRouter } from "next/navigation";
import { SelectedSummaryTopicContext } from "../../contexts/SelectedSummaryJson";

export const countSubtopicOccurrences = (
  topicCommentsList: TopicComments[]
): { value: number; label: string }[] => {
  const counts = topicCommentsList.reduce((acc, { subtopic }) => {
    if (subtopic) acc[subtopic] = (acc[subtopic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const result = Object.entries(counts).map(([label, value]) => ({
    value,
    label,
  }));

  return result;
};

const size = {
  width: 1000,
  height: 400,
};

type Props = {
  inputData: TopicComments[];
  currentTopic: Topic;
};

const CustomPieChart = ({ inputData, currentTopic }: Props) => {
  const { setDataTopic, setDataSubTopic } = useContext(
    SelectedSummaryTopicContext
  );
  const router = useRouter();

  const subTopicOccurrencesData = countSubtopicOccurrences(inputData);

  const handleClick = (event: any, data: any) => {
    const subTopicLabel = subTopicOccurrencesData[data.dataIndex].label;
    setDataSubTopic(subTopicLabel);
    setDataTopic(currentTopic);
    router.push("./summary");
  };

  return (
    <PieChart
      onClick={(event, data) => handleClick(event, data)}
      series={[
        {
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 10,
          data: subTopicOccurrencesData,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
};

export default CustomPieChart;
