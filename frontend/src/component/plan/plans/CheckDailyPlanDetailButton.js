import {useState} from "react";
import {Button, Modal, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

const CheckDailyPlanDetailButton = (props) => {
    const [visible, setVisible] = useState(false);
    const {data} = props;

    const handleOpen = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Tooltip title="View Plan Detail">
                <Button icon={<InfoCircleOutlined/>}
                        onClick={handleOpen}/>
            </Tooltip>
            {visible && (
                <Modal title={data.place}
                       open={visible}
                       closable={true}
                       footer={null}
                       onCancel={handleCancel}>
                    <Text>{data.description}</Text>
                </Modal>
            )}
        </div>
    );
};

export default CheckDailyPlanDetailButton;