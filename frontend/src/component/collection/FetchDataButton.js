import {Button} from "antd";
import {CloudDownloadOutlined} from "@ant-design/icons";

const FetchDataButton = (props) => {
    const {handlePlan, handleGet} = props;

    const handleFetch = async () => {
        const data = await handleGet();
        handlePlan(data);
        console.log(data);
    };

    return (
        <Button onClick={handleFetch} type="primary" icon={<CloudDownloadOutlined/>}>Fetch Plans</Button>
    );
};

export default FetchDataButton;