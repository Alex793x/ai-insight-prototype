"use client";
import { Tabs, Tab } from "@nextui-org/react";
import TopicAnalyticContainer from "@/components/TopicAnalyticContainer";
import { CustomTabs } from "@/utilities/CustomTabs";
import { NextPage } from "next";
import Image from "next/image";

const AI_InsightLandingPage: NextPage = () => {
  return (
    <div className="relative flex items-center w-full flex-col">
      {/* Absolute positioned SVG image */}
      <div className="absolute top-1 left-1">
        <Image src="/vercel.svg" alt="Logo" width={100} height={100} />
      </div>

      <Tabs aria-label="Dynamic tabs">
        {CustomTabs.map((item) => (
          <Tab key={item.id} title={item.topic}>
            <TopicAnalyticContainer
              topic={item.topic}
              topicDescription={item.topicDescription}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default AI_InsightLandingPage;
