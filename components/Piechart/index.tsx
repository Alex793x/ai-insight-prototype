"use client";
import React from 'react'
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { TopicComments } from '@/types/TopicComments';
import { Topic } from '@/types/Topic';
import { useRouter } from 'next/router';





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
  inputData: TopicComments[];
  currentTopic: Topic

}

const CustomPieChart = ({inputData, currentTopic}: Props) => {
  const router = useRouter();

  const subTopicOccurencesData = countSubtopicOccurrences(inputData);


  const handleClick = (event: any, data: any) => {
    const subTopicLabel = subTopicOccurencesData[data.dataIndex].label;
    console.log(subTopicLabel);


    router.push({
      pathname: '/summary', // Specify the destination path
      query: { sub_topic: subTopicLabel, topic: currentTopic },
    });
  };

  return (
    <PieChart
    onClick={(event, data) => handleClick(event, data)}
    series={[
        {
          arcLabel: (item) => `${item.value}`,
          arcLabelMinAngle: 10,
          data: subTopicOccurencesData,
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


