"use client";
import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

type Props = {
    filterName: "Country" | "Department" | "Role" | "Module";
    filterData?: string[];
    isDisabled?: boolean;
}

export const CustomDropDownForFilters = ({ filterData, filterName, isDisabled = true }: Props) => {
    const [selectedKeys, setSelectedKeys] = useState([]);
    console.log(selectedKeys)

    return (
        <Dropdown isDisabled={isDisabled}>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                >
                    {filterName}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                //@ts-ignore
                onSelectionChange={setSelectedKeys}
            >
                {filterData && filterData.map((data, key) =>
                    <DropdownItem key={key}>{data}</DropdownItem>
                ) || []}
            </DropdownMenu>
        </Dropdown>
    );
}
