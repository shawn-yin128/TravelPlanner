import {useState} from "react";
import {Button, Col, Divider, Modal, Row, Timeline, Tooltip} from "antd";
import {InfoCircleOutlined} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import PlanSearchBlock from "../../plan/PlanSearchBlock";
import {getPlanPost} from "../../../utils/BackendUtils";

const CheckPostPlanDetailButton = (props) => {
    const [visible, setVisible] = useState(false);
    const [plan, setPlan] = useState([]);
    const [items, setItems] = useState([]);
    const [geo, setGeo] = useState([]);
    const {planId} = props;

    const handleOpen = async () => {
        const data = await getPlanPost(planId);
        setPlan(data);
        console.log(plan);
        let itemsTemp = [];
        let geoTemp = [];
        for (const daily of plan.plan_details) {
            const timelineItem = {
                label: daily.date,
                children: daily.place
            }
            const geoItem = {
                geo: {
                    lat: daily.lat,
                    lng: daily.lng
                }
            }
            itemsTemp = [...itemsTemp, timelineItem];
            geoTemp = [...geoTemp, geoItem];
        }
        setItems(itemsTemp);
        setGeo(geoTemp);
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
                <Modal title={plan.place}
                       open={visible}
                       closable={true}
                       footer={null}
                       onCancel={handleCancel}
                       style={{top: 20}}
                       width={1000}>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Text style={{fontSize: '20px'}}>Plan Timeline</Text>
                            <Divider/>
                            <Timeline mode="left" items={items}/>
                        </Col>
                        <Col span={16}>
                            <Text style={{fontSize: '20px'}}>Plan Route</Text>
                            <Divider/>
                            <PlanSearchBlock route={true} plans={geo}/>
                        </Col>
                    </Row>
                </Modal>
            )}
        </div>
    );
};

export default CheckPostPlanDetailButton;