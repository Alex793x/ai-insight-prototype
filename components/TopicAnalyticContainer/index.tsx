"use client";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import CustomPieChart from "../Piechart";
import { CustomDropDownForFilters } from "../CustomDropDown";
import { Button } from "@nextui-org/react";
import { Topic } from "@/types/Topic";
import { TopicComments } from "@/types/TopicComments";
import { DataContext } from "@/contexts/DataContext";
import ChatbotButton from "../CustomButton";


const avilableCountries = [
    "Denmark", "Sweden", "Finland", "Germany"
]

type Props = {
    topicDescription: string
    topic: Topic
}
const TopicAnalyticContainer = ({ topicDescription, topic }: Props) => {
    const jsonData = useContext(DataContext)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [countries, setCountries] = useState([]);
    const [currentTopic, setCurrentTopic] = useState<Topic>()
    const [data, setData] = useState<TopicComments[]>([])
    const [filteredDataTopic, setFilteredDataTopics] = useState<TopicComments[]>([]);

    const [isFiltering, setIsFiltering] = useState(false);

    const filterByChosenCountries = () => {
        const selectedCountries = avilableCountries.filter((country, index) => selectedKeys.includes(index.toString()));
        return selectedCountries.map(country => ({
            country,
            data: data.filter(item => item.country === country),
        }));
    };



    const handleDataSet = () => {
        switch (topic) {
            case Topic.OPPORTUNITIES:
                setData(jsonData.opportunityData)
                break;
            case Topic.OPERATIONS:
                setData(jsonData.operationData)
                break;
            case Topic.LEARNINGS:
                setData(jsonData.learningsData);
                break;
            case Topic.GAPS:
                setData(jsonData.gapsData);
        }
    }

    useEffect(() => {
        handleDataSet();
    }, [topic])

    useEffect(() => {
        if (selectedKeys.length === 0) {
            setIsFiltering(false);
        }
    }, [selectedKeys])

    return (
        <>
            <Card>
                <div className="flex">
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                            <p className="pb-20 px-20 font-bold font-serif text-center" style={{ margin: 'auto' }}>{topicDescription}</p>
                            <p className="text-start">Total comments analysed: <strong>{data.length}</strong></p>
                        </div>
                    </CardBody>
                    <CardBody>
                        <div className="flex">
                            <CustomPieChart inputData={data} />
                        </div>
                    </CardBody>
                </div>
            </Card>
            <Divider className="my-4" />
            <Card>
                <CardBody >
                    <div className="flex justify-center gap-10">
                        <CustomDropDownForFilters filterName="Department" />
                        <CustomDropDownForFilters selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} filterData={avilableCountries} filterName="Country" />
                        <CustomDropDownForFilters filterName="Module" />
                        <CustomDropDownForFilters filterName="Role" />
                        <Button onClick={() => { filterByChosenCountries() && setIsFiltering(true) }} color="success" className="text-white" variant="solid">
                            + Filter
                        </Button>
                        <ChatbotButton />
                    </div>
                </CardBody>
            </Card>
            {isFiltering &&
                filterByChosenCountries().map(({ country, data }) => (
                    <div key={country} className="flex flex-col items-center justify-center w-full"> {/* Ensure key is on the root element and use flex-col for column orientation */}
                        <Divider className="my-4" />
                        <Card className="w-full"> {/* Adjust width as necessary */}
                            <CardBody>
                                <div className="flex flex-col items-center justify-center"> {/* Center content vertically and horizontally */}
                                    <h3 className="text-lg font-serif font-bold mb-4">{country}</h3> {/* Display the country name with margin bottom */}
                                    <CustomPieChart inputData={data} />
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))
            }

        </>
    )
}

export default TopicAnalyticContainer
