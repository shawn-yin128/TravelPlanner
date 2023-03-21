import PostSearchBar from "./search/PostSearchBar";
import {Divider} from "antd";
import PostPreBlock from "./search/PostPreBlock";
import {useState} from "react";

const ShareSearchBlock = () => {
    const [data, setData] = useState([]);

    return (
        <>
            <PostSearchBar handleSearch={setData}/>
            <Divider/>
            <PostPreBlock data={data}/>
        </>
    );
};

export default ShareSearchBlock;