"use client";

// React Imports -----
import React, { useContext, useEffect, useState } from "react";

// Nextjs UI imports --------
import { Card, CardBody, } from "@nextui-org/react";
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
    topicDescription: string
    topic: Topic
}
const TopicAnalyticContainer = ({ topicDescription, topic }: Props) => {
    const jsonData = useContext(DataContext)
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [currentTopic, setCurrentTopic] = useState<Topic>(Topic.OPPORTUNITIES)
    const [data, setData] = useState<TopicComments[]>([])
    const [filteredCountries, setFilteredCountries] = useState<{ country: string; data: TopicComments[] }[]>([]);


    const handleDataSet = () => {
        switch (topic) {
            case Topic.OPPORTUNITIES:
                setCurrentTopic(topic)
                setData(jsonData.opportunityData)
                break;
            case Topic.OPERATIONS:
                setCurrentTopic(topic)
                setData(jsonData.operationData)
                break;
            case Topic.LEARNINGS:
                setCurrentTopic(topic)
                setData(jsonData.learningsData);
                break;
            case Topic.GAPS:
                setCurrentTopic(topic)
                setData(jsonData.gapsData);
        }
    }

    useEffect(() => {
        handleDataSet();
    }, [topic]);

    useEffect(() => {
        // Filter the filteredCountries to include only those that are currently selected
        const updatedFilteredCountries = filteredCountries.filter(filteredCountry =>
            selectedKeys.includes(AvailableCountries.findIndex(country => country === filteredCountry.country).toString())
        );
    
        // Update the state to reflect the current selections
        setFilteredCountries(updatedFilteredCountries);
    }, [selectedKeys]);


    const applyFilters = () => {
        // Filter out countries based on selected keys.
        const newFilteredCountries = AvailableCountries.filter((_, index) => selectedKeys.includes(index.toString()))
            .map(country => ({
                country,
                data: data.filter(item => item.country === country),
            }));
    
        // Check if a country is already in the filteredCountries state before adding.
        const updatedFilteredCountries = newFilteredCountries.reduce((acc, newCountry) => {
            // Check if this country is already included in the filtered list.
            const isAlreadyIncluded = acc.some(filteredCountry => filteredCountry.country === newCountry.country);
            
            // If it's not already included, add it to the accumulator.
            if (!isAlreadyIncluded) {
                acc.push(newCountry);
            }
            
            return acc;
        }, [...filteredCountries]);
    
        setFilteredCountries(updatedFilteredCountries);
    };

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
                            <CustomPieChart currentTopic={currentTopic} inputData={data} />
                        </div>
                    </CardBody>
                </div>
            </Card>
            <Divider className="my-4" />
            <Card>
                <CardBody >
                    <div className="flex justify-center gap-10">
                        <CustomDropDownForFilters filterName="Department" />
                        <CustomDropDownForFilters selectedKeys={selectedKeys} setSelectedKeys={setSelectedKeys} filterData={AvailableCountries} filterName="Country" />
                        <CustomDropDownForFilters filterName="Module" />
                        <CustomDropDownForFilters filterName="Role" />
                        <Button onClick={applyFilters} color="success" className="text-white" variant="solid">
                            + Filter
                        </Button>
                        <ChatbotButton />
                    </div>
                </CardBody>
            </Card>
            {filteredCountries.map(({ country, data }, index) => (
                <div key={index} className="flex flex-col items-center justify-center w-full">
                    <Divider className="my-4" />
                    <Card className="w-full">
                        <CardBody>
                            <div className="flex flex-col items-center justify-center">
                                <h3 className="text-lg font-serif font-bold mb-4">{country}</h3>
                                <CustomPieChart currentTopic={currentTopic} inputData={data} />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            ))}
        </>
    )
}

export default TopicAnalyticContainer
