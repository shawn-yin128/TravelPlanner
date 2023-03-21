import {Col, Row} from "antd";
import PlanManagerBlock from "./PlanManagerBlock";
import PlanSearchBlock from "./PlanSearchBlock";
import {useEffect, useState} from "react";

const PlanPage = (props) => {
    const [plans, setPlans] = useState([]);
    const [add, setAdd] = useState(null);
    const [del, setDelete] = useState(null);
    const [route, setRoute] = useState(false);

    const {authed} = props;

    useEffect(() => {
        if (add !== null) {
            const newPlans = [...plans, add];
            newPlans.sort((one, two) => (one.date < two.date) ? -1 : ((one.date > two.date) ? 1 : 0));
            setPlans(newPlans);
            setAdd(null);
        }
    }, [add]);

    useEffect(() => {
        if (del !== null) {
            const newPlans = plans.filter((elm) => elm.location_id !== del.location_id);
            setPlans(newPlans);
            setDelete(null);
        }
    }, [del]);

    return (
        <Row gutter={16}>
            <Col span={8}>
                <PlanManagerBlock plans={plans} authed={authed} handleDelete={setDelete} handleRoute={setRoute}/>
            </Col>
            <Col span={16}>
                <PlanSearchBlock route={route} plans={plans} handleAdd={setAdd}/>
            </Col>
        </Row>
    );
}

export default PlanPage;