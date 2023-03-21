import {useEffect, useState} from "react";
import {Button, Divider, Modal, Timeline, Tooltip} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";

const CheckTimeLineButton = (props) => {
    const [visible, setVisible] = useState(false);
    const [items, setItems] = useState([]);
    const {plans} = props;

    useEffect(() => {
        let itemsTemp = [];
        for (const plan of plans) {
            const item = {
                label: plan.date,
                children: plan.place
            }
            itemsTemp = [...itemsTemp, item];
        }
        setItems(itemsTemp);
    }, [plans]);

    const handleOpen = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Tooltip title="View Plan Timeline">
                <Button icon={<UnorderedListOutlined/>}
                        onClick={handleOpen}/>
            </Tooltip>
            {visible && (
                <Modal open={visible}
                       title={<><Text style={{fontSize: '20px'}}>Plan Timeline</Text><Divider/></>}
                       closable={true}
                       footer={null}
                       onCancel={handleCancel}>
                    <Timeline mode="left"
                              items={items}/>
                </Modal>
            )}
        </div>
    );
};

export default CheckTimeLineButton;