"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

type Props = {
    filterName: "Country" | "Department" | "Role" | "Module";
    filterData?: string[];
    selectedKeys?: string[];
    setSelectedKeys?: Dispatch<SetStateAction<string[]>>;
    isDisabled?: boolean;
}

export const CustomDropDownForFilters = ({ filterName, filterData, selectedKeys, setSelectedKeys, isDisabled = false }: Props) => {
    const handleAction = (key: string) => {
        setSelectedKeys && setSelectedKeys(prev => {
            if (prev.includes(key)) {
                // Remove the key if it's already selected
                return prev.filter(k => k !== key);
            } else {
                // Add the key if it's not already selected
                return [...prev, key];
            }
        });
    };

    return (
        <Dropdown isDisabled={isDisabled}>
            <DropdownTrigger>
                <Button variant="bordered">
                    {filterName}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label={`${filterName} filter selection`}
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onAction={(key: any) => handleAction(key)}
            >
                {filterData?.map((data, index) =>
                    <DropdownItem key={index.toString()}>{data}</DropdownItem>
                ) || []}
            </DropdownMenu>
        </Dropdown>
    );
}
