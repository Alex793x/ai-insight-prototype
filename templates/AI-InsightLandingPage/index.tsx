"use client";
import { NextPage } from "next";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import TopicAnalyticContainer from "@/components/TopicAnalyticContainer";
import { Topic } from "@/types/Topic";



const AI_InsightLandingPage = () => {

    const customTabs = [
        {
            id: "Opportunities",
            topic: Topic.OPPORTUNITIES,
            topicDescription: "These are the top most important 5 opportunities. It provides insights into the top 5 opportunities based on current market trends and analysis.",
            topicCount: 4000

        },
        {
            id: "Operations",
            topic: Topic.OPERATIONS,
            topicDescription: "This is your top 5 Operations chart overview. It provides insights into the top 5 Operations based on current market trends and analysis.",
            topicCount: 3500
        },
        {
            id: "Learnings",
            topic: Topic.LEARNINGS,
            topicDescription: "This is your top 5 Learnings chart overview. It provides insights into the top 5 Learnings based on current market trends and analysis.",
            topicCount: 2000
        },
        {
            id: "Gaps",
            topic: Topic.GAPS,
            topicDescription: "This is your top 5 Gaps chart overview. It provides insights into the top 5 Gaps based on current market trends and analysis.",
            topicCount: 3000
        },
    ];
    return (
        <>
            <div className="flex items-center w-full flex-col">
                <Tabs key={"light"} aria-label="Dynamic tabs" items={customTabs}>
                    {(item) => (
                        <Tab key={item.id} title={item.topic}>
                            <TopicAnalyticContainer topic={item.topic} topicDescription={item.topicDescription} topicCount={item.topicCount}/>
                        </Tab>
                    )}
                </Tabs>
            </div>
        </>
    );
};

export default AI_InsightLandingPage;
