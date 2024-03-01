"use client";

// React Imports -----
import React, { useContext, useEffect, useState } from "react";

// NextUI imports --------
import { Card, CardBody } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { CustomDropDownForFilters } from "../CustomDropDown";
import { Button } from "@nextui-org/react";

// Types import ---------
import { Topic } from "@/types/Topic";
import { TopicComments } from "@/types/TopicComments";

// Context import -------
import { DataContext } from "@/contexts/DataContext";

// Components import -----
import CustomPieChart from "@/components/Piechart";
import ChatbotButton from "@/components/CustomButton";
import { AvailableCountries } from "@/utilities/CustomAvailableCountries";

type Props = {
  topicDescription: string;
  topic: Topic;
};
const TopicAnalyticContainer = ({ topicDescription, topic }: Props) => {
  const jsonData = useContext(DataContext);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [currentTopic, setCurrentTopic] = useState<Topic>(Topic.OPPORTUNITIES);
  const [data, setData] = useState<TopicComments[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredByChosenCountries, setFilteredByChosenCOuntries] = useState<
    {
      country: string;
      data: TopicComments[];
    }[]
  >([]);

  useEffect(() => {
    const filterByChosenCountries = () => {
      const selectedCountries = AvailableCountries.filter((country, index) =>
        selectedKeys.includes(index.toString())
      );
      return selectedCountries.map((country) => ({
        country,
        data: data.filter((item) => item.country === country),
      }));
    };
    const d = filterByChosenCountries();
    setFilteredByChosenCOuntries(d);
  }, [data, selectedKeys]);

  useEffect(() => {
    const handleDataSet = () => {
      switch (topic) {
        case Topic.OPPORTUNITIES:
          setCurrentTopic(topic);
          setData(jsonData.opportunityData);
          break;
        case Topic.OPERATIONS:
          setCurrentTopic(topic);
          setData(jsonData.operationData);
          break;
        case Topic.LEARNINGS:
          setCurrentTopic(topic);
          setData(jsonData.learningsData);
          break;
        case Topic.GAPS:
          setCurrentTopic(topic);
          setData(jsonData.gapsData);
      }
    };
    handleDataSet();
  }, [
    jsonData.gapsData,
    jsonData.learningsData,
    jsonData.operationData,
    jsonData.opportunityData,
    topic,
  ]);

  useEffect(() => {
    if (selectedKeys.length === 0) {
      setIsFiltering(false);
    }
  }, [selectedKeys]);

  return (
    <>
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
              <p
                className="pb-20 px-10 font-semibold text-base font-sans text-start"
                style={{ margin: "auto" }}
              >
                {topicDescription}
              </p>
              <p className="text-start text-base font-sans p-10">
                Total comments analyzed: <strong>{data.length}</strong>
              </p>
            </div>
          </CardBody>
          <CardBody>
            <div className="flex">
              <CustomPieChart currentTopic={currentTopic} inputData={data} />
            </div>
          </CardBody>
        </div>
      </Card>
      <Divider className="my-4" />
      <Card>
        <CardBody>
          <div className="flex justify-center gap-10">
            <CustomDropDownForFilters filterName="Department" />
            <CustomDropDownForFilters
              selectedKeys={selectedKeys}
              setSelectedKeys={setSelectedKeys}
              filterData={AvailableCountries}
              filterName="Country"
            />
            <CustomDropDownForFilters filterName="Module" />
            <CustomDropDownForFilters filterName="Role" />
            <Button
              onClick={() => {
                filteredByChosenCountries && setIsFiltering(true);
              }}
              color="success"
              className="text-white"
              variant="solid"
            >
              + Filter
            </Button>
            <ChatbotButton />
          </div>
        </CardBody>
      </Card>
      {isFiltering &&
        filteredByChosenCountries.map(({ country, data }) => (
          <div
            key={country}
            className="flex flex-col items-center justify-center w-full"
          >
            {" "}
            {/* Ensure key is on the root element and use flex-col for column orientation */}
            <Divider className="my-4" />
            <Card className="w-full">
              {" "}
              {/* Adjust width as necessary */}
              <CardBody>
                <div className="flex flex-col items-center justify-center">
                  {" "}
                  {/* Center content vertically and horizontally */}
                  <h3 className="text-lg font-serif font-bold mb-4">
                    {country}
                  </h3>{" "}
                  {/* Display the country name with margin bottom */}
                  <CustomPieChart
                    currentTopic={currentTopic}
                    inputData={data}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
    </>
  );
};

export default TopicAnalyticContainer;
