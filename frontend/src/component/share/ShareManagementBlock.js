import {useState} from "react";
import FetchDataButton from "../collection/FetchDataButton";
import {getPlanPostByUser} from "../../utils/BackendUtils";
import {Divider} from "antd";
import ManagementPreBlock from "./management/ManagementPreBlock";

const ShareManagementBlock = () => {
    const [posts, setPosts] = useState([]);

    return (
        <>
            <FetchDataButton handlePlan={setPosts} handleGet={getPlanPostByUser}/>
            <Divider/>
            <ManagementPreBlock posts={posts}/>
        </>
    );
};

export default ShareManagementBlock;