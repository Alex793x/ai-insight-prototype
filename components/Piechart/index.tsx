"use client";
import React from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { TopicComments } from '@/types/TopicComments';

export const countSubtopicOccurrences = (topicCommentsList: TopicComments[]): { value: number, label: string }[] => {

  const counts = topicCommentsList.reduce((acc, { subtopic }) => {
    if (subtopic) acc[subtopic] = (acc[subtopic] || 0) + 1;
      return acc;
  }, {} as Record<string, number>);


  const result = Object.entries(counts).map(([label, value]) => ({
      value,
      label
  }));

  return result;
}

const size = {
  width: 1000,
  height: 400,
};

type Props = {
  inputData: TopicComments[]

}

const CustomPieChart = ({inputData}: Props) => {
  const data = countSubtopicOccurrences(inputData);

  return (
    <PieChart
      series={[
        {
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 10,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  )
}

export default CustomPieChart;


