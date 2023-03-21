import {InfoBox} from "@react-google-maps/api";
import {Button, Card, Rate, Space, Tooltip} from "antd";
import Text from "antd/lib/typography/Text";
import AddDailyPlanButton from "./AddDailyPlanButton";
import Meta from "antd/es/card/Meta";
import {ClearOutlined} from "@ant-design/icons";

const InformationBox = (props) => {
    const {center, data, handleAdd, handleCancel} = props;

    const handleClear = () => {
        handleCancel(null);
    };

    return (
        <InfoBox position={center}>
            <Card actions={[<AddDailyPlanButton data={data} handleAdd={handleAdd}/>,
                <Tooltip title="Clear"><Button size='small' icon={<ClearOutlined/>} onClick={handleClear}/></Tooltip>]}>
                <Meta title={
                    <Space direction="vertical">
                        <Text strong={true}>{data.name}</Text>
                        <Rate disabled
                              value={data.rating}
                              style={{fontSize: '15px'}}/>
                    </Space>}/>
            </Card>
        </InfoBox>
    );
};

export default InformationBox;