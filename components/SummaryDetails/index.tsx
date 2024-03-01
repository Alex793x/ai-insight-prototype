import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { DataContext } from "../../contexts/DataContext";
import { SummaryContext } from "../../contexts/SummaryData";
import { SelectedSummaryTopicContext } from "../../contexts/SelectedSummaryJson";
import { Topic } from "../../types/Topic";
import { TopicComments } from "../../types/TopicComments";
import { Summary } from "../../types/Summary";

const SummaryDetails = () => {
  const summaryData = useContext(SummaryContext);
  const jsonTopicData = useContext(DataContext);
  const { dataTopic, dataSubTopic, isLCA } = useContext(
    SelectedSummaryTopicContext
  );

  // States for summary and topic data
  const [summary, setSummary] = useState<Summary[]>([]);
  const [topicData, setTopicData] = useState<TopicComments[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 6;

  useEffect(() => {
    const handleDataSet = () => {
      if (isLCA) {
        setSummary(summaryData.lcaSummary);
        setTopicData(jsonTopicData.lcaData);
      } else {
        switch (dataTopic) {
          case Topic.OPPORTUNITIES:
            setSummary(summaryData.opportunitySummary);
            setTopicData(jsonTopicData.opportunityData);
            break;
          case Topic.OPERATIONS:
            setSummary(summaryData.operationSummary);
            setTopicData(jsonTopicData.operationData);
            break;
          case Topic.LEARNINGS:
            setSummary(summaryData.learningsSummary);
            setTopicData(jsonTopicData.learningsData);
            break;
          case Topic.GAPS:
            setSummary(summaryData.gapsSummary);
            setTopicData(jsonTopicData.gapsData);
            break;
          default:
            // Handle default case
            break;
        }
      }
    };
    handleDataSet();
  }, [dataTopic, isLCA, jsonTopicData, summaryData]);

  const filteredTopicDataBySubtopic = useMemo(
    () => topicData.filter((item) => item.subtopic === dataSubTopic),
    [topicData, dataSubTopic]
  );
  const filterSubtopic = useCallback(() => {
    return summary.filter((item) => item.subtopic === dataSubTopic);
  }, [summary, dataSubTopic]);

  const filteredSubtopicData = useMemo(filterSubtopic, [filterSubtopic]);
  const filteredSingleSubtopicData = filteredSubtopicData.length
    ? filteredSubtopicData[0].summary.split(".")
    : [];

  // Calculate the current comments to display based on pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredTopicDataBySubtopic.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // Change page function
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col w-full">
      <div className="bg-white shadow rounded-lg p-4 m-2 w-5/6">
        <h1 className="text-3xl font-bold px-3 text-indigo-600 tracking-wide">
          Summary
        </h1>
        <div className="flex flex-col justify-start h-full">
          <ul className="list-disc list-inside text-base font-sans p-3">
            {filteredSingleSubtopicData.map(
              (point, index) =>
                point.trim() !== "" && (
                  <li key={index} className="text-left">
                    {point}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <h1 className="px-9 text-3xl font-bold text-indigo-600 tracking-wide">
        Comments
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {currentComments.map((item) => (
          <div
            key={item.ID}
            className="bg-white shadow rounded-lg p-4 m-2 flex flex-col justify-between h-full"
          >
            <div>
              <p className="text-sm px-3 text-gray-500">
                Country: {item.country}
              </p>
              <p className="text-base font-sans mx-auto p-3">
                {item.comments_eng}
              </p>
            </div>
            <p className="text-sm text-gray-500 px-3 py-1">
              Posted on: {item.received}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {filteredTopicDataBySubtopic.length > commentsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from(
            {
              length: Math.ceil(
                filteredTopicDataBySubtopic.length / commentsPerPage
              ),
            },
            (_, index) => index + 1
          ).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 mx-1 ${
                currentPage === number
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SummaryDetails;
