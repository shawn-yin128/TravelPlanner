import {Tabs} from "antd";
import ShareSearchBlock from "./ShareSearchBlock";
import ShareManagementBlock from "./ShareManagementBlock";
import {useEffect, useState} from "react";

const SharePage = () => {
    const items = [
        {
            label: "Search",
            key: "1",
            children: <ShareSearchBlock/>
        },
        {
            label: "My Posts",
            key: "2",
            children: <ShareManagementBlock/>
        }
    ];

    return (
        <Tabs defaultActiveKey="1" tabPosition="left" items={items}/>
    );
}

export default SharePage;