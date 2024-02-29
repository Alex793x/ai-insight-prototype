"use client";
import { SelectedSummaryTopicContext } from '@/contexts/SelectedSummaryJson';
import { NextRouter, useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

const SummarDetails = () => {
    const {dataTopic, dataSubTopic} = useContext(SelectedSummaryTopicContext)

    console.log("Printing the dataTopic, and SubTopic", dataSubTopic, dataTopic);
    return (
        <div className="flex items-center w-full flex-col">
            <h1>SECTION 2</h1>
            {/* Displaying the extracted query parameters */}

        </div>
    );
};

export default SummarDetails;
