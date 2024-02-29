"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import CustomPieChart from "../Piechart";
import { CustomDropDownForFilters } from "../CustomDropDown";
import { Button } from "@nextui-org/react";
import { Topic } from "@/types/Topic";
import { TopicComments } from "@/types/TopicComments";

import { OpportunitiesDataSet } from "@/data/opportunities_comments";




type Props = {
    topicDescription: string
    topicCount: number
    topic: Topic
}
const TopicAnalyticContainer = ({ topicDescription, topicCount, topic }: Props) => {
    const [countries, setCountries] = useState(["Denmark", "German"]);
    const[currentTopic, setCurrentTopic] = useState<Topic>()
    const[data, setData] = useState<TopicComments[]>([])
    const [filteredDataTopic, setFilteredDataTopics] = useState<TopicComments[]>([]);

    useEffect(() => {
        setCurrentTopic(topic)
    },[topic])

    useEffect(() => {

    }, [currentTopic])

    const handleFilterClick = () => {

    }

    return (
        <>
            <Card>
                <div className="flex">
                    <CardBody>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                            <p className="pb-20 px-20 font-bold font-serif text-center" style={{ margin: 'auto' }}>{topicDescription}</p>
                            <p className="text-start">Total comments analysed: <strong>{OpportunitiesDataSet.length}</strong></p>
                        </div>
                    </CardBody>
                    <CardBody>
                        <div className="flex">
                            <CustomPieChart inputData={OpportunitiesDataSet} />
                        </div>
                    </CardBody>
                </div>
            </Card>
            <Divider className="my-4" />
            <Card>
                <CardBody >
                    <div className="flex justify-center gap-10">
                        <CustomDropDownForFilters filterName="Department" />
                        <CustomDropDownForFilters filterData={countries} filterName="Country" />
                        <CustomDropDownForFilters filterName="Module" />
                        <CustomDropDownForFilters filterName="Role" />
                        <Button color="success" className="text-white" variant="solid">
                            + Filter
                        </Button>
                    </div>
                </CardBody>

            </Card>
        </>
    )
}

export default TopicAnalyticContainer
