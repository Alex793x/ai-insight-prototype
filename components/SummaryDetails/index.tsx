"use client";
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SummarDetails = () => {
    let router: NextRouter
    const [subTopic, setSubtopic] =  useState<string | string[] | undefined>("") 
    const [topic, setTopic] =  useState<string | string[] | undefined>("")

    useEffect(() => {
        router = useRouter();
        const { sub_topic, topic } =  router.query;
        setSubtopic(sub_topic)
        setTopic(topic)

    },[])

    // Destructure the query object to extract sub_topic and topic parameters

    return (
        <div className="flex items-center w-full flex-col">
            <h1>SECTION 2</h1>
            {/* Displaying the extracted query parameters */}
            <p>Sub Topic: {subTopic}</p>
            <p>Topic: {topic}</p>
        </div>
    );
};

export default SummarDetails;
