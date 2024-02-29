"use client"; // Assuming you might need client-side rendering for other reasons

import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { Topic } from "../../types/Topic";
import { DataContext } from "../../contexts/DataContext";
import { TopicComments } from "../../types/TopicComments";
import { SummaryContext } from "../../contexts/SummaryData";
import { Summary } from "../../types/Summary";
import { Card, CardBody, Divider } from "@nextui-org/react";

const SummaryDetails = () => {
  const topicData = useContext(DataContext);
  const summaryData = useContext(SummaryContext);
  const [currentTopic, setCurrentTopic] = useState<Topic>(Topic.OPPORTUNITIES);
  const [filteredTopicData, setTopicData] = useState<TopicComments[]>([]);
  const [summary, setSummary] = useState<Summary[]>([]);

  const subTopic = "Sustainability Training";
  const topic = Topic.OPPORTUNITIES; // Are these dynamic from query parameters?

  // Memoize the filtering logic
  const filterTopicDataBySubtopic = useCallback(() => {
    return filteredTopicData.filter((item) => item.subtopic === subTopic);
  }, [filteredTopicData, subTopic]);

  // Memoize the filtered result
  const filteredTopicDataBySubtopicData = useMemo(filterTopicDataBySubtopic, [
    filterTopicDataBySubtopic,
  ]);

  // Memoize the filtering logic
  const filterSubtopic = useCallback(() => {
    return summary.filter((item) => item.subtopic === subTopic);
  }, [summary, subTopic]);
  // Memoize the filtered result
  const filteredSubtopicData = useMemo(filterSubtopic, [filterSubtopic]);

  console.log(
    "OVERVIEW DATA FILTERED BY SUBTOPIC... ",
    filteredTopicDataBySubtopicData
  );
  console.log("FILTERED SUMMARY DATA... ", filteredSubtopicData);

  useEffect(() => {
    setTopicData(topicData.opportunityData);
    setSummary(summaryData.opportunitySummary);
  }, [topicData.opportunityData, summaryData.opportunitySummary]);

  return (
    <div className="flex w-fill flex-col">
      {/* SUMMARY */}
      <h1>Summary</h1>
      <Card>
        <div className="flex">
          <CardBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <p className="p-3 font-serif" style={{ margin: "auto" }}>
                {filteredSubtopicData.length && filteredSubtopicData[0].summary}
              </p>
            </div>
          </CardBody>
        </div>
      </Card>
      <Divider className="my-4" />
      {/* COMMENTS LIST */}
      <h1>Comments</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        {filteredTopicDataBySubtopicData.map((item) => (
          <Card key={item.ID}>
            <div className="flex">
              <CardBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <p className="p-3 font-serif" style={{ margin: "auto" }}>
                    {item.comments_eng}{" "}
                  </p>
                </div>
              </CardBody>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SummaryDetails;
