"use client";
import { Tabs, Tab,} from "@nextui-org/react";
import TopicAnalyticContainer from "@/components/TopicAnalyticContainer";
import { CustomTabs } from "@/utilities/CustomTabs";
import { NextPage } from "next";



const AI_InsightLandingPage: NextPage = () => {
    return (
        <div className="flex items-center w-full  flex-col">
            <Tabs size="lg" aria-label="Dynamic tabs">
                {CustomTabs.map((item) => (
                    <Tab key={item.id} title={item.topic}>
                        <TopicAnalyticContainer topic={item.topic} topicDescription={item.topicDescription} />
                    </Tab>
                ))}
            </Tabs>
        </div >
    );
};

export default AI_InsightLandingPage;
