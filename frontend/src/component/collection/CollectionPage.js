import {useEffect, useState} from "react";
import {Card, List, Space, Spin, Tabs} from "antd";
import FetchDataButton from "./FetchDataButton";
import CheckPlanDetailButton from "./CheckPlanDetailButton";
import Text from "antd/lib/typography/Text";
import DeletePlanButton from "./DeletePlanButton";
import UploadPlanPostButton from "./UploadPlanPostButton";
import {getPlans} from "../../utils/BackendUtils";

const CollectionPage = () => {
    const [plans, setPlans] = useState([]);
    const [past, setPast] = useState([]);
    const [future, setFuture] = useState([]);
    const [now, setNow] = useState([]);

    const partitionPlans = () => {
        const current = new Date().toISOString().split('T')[0];
        console.log(current);
        const pastTemp = [];
        const futureTemp = [];
        const nowTemp = [];
        for (const plan of plans) {
            if (plan.end_date < current) {
                pastTemp.push(plan);
            } else if (plan.start_date > current) {
                futureTemp.push(plan);
            } else {
                nowTemp.push(plan);
            }
        }
        setPast(pastTemp);
        setFuture(futureTemp);
        setNow(nowTemp);
    };

    useEffect(() => {
        partitionPlans();
    }, [plans]);

    const renderList = (data) => {
        return (
            <List grid={{
                gutter: 8,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
            }}
                  dataSource={data}
                  renderItem={item => (
                      <List.Item>
                          <Card title={item.title}
                                actions={[<DeletePlanButton planId={item.id}/>, <UploadPlanPostButton plan={item}/>]}
                                extra={<CheckPlanDetailButton plan={item}/>}>
                              <Card.Meta description={
                                  <div style={{maxHeight: '100px', overflow: 'scroll'}}>
                                      <Space direction="vertical">
                                          <Text style={{fontSize: '10px'}}>Start Date: {item.start_date}</Text>
                                          <Text style={{fontSize: '10px'}}>End Date: {item.end_date}</Text>
                                          <Text style={{fontSize: '10px'}}>Description: {item.description}</Text>
                                      </Space>
                                  </div>
                              }/>
                          </Card>
                      </List.Item>
                  )}
            />
        );
    };

    const tabModeItems = [
        {
            key: '1',
            label: 'Future Plans',
            children: renderList(future)
        },
        {
            key: '2',
            label: 'In Progress',
            children: renderList(now)
        },
        {
            key: '3',
            label: 'Past Plans',
            children: renderList(past)
        }
    ];

    return (
        <Tabs defaultActiveKey='1' items={tabModeItems}
              tabBarExtraContent={<FetchDataButton handlePlan={setPlans} handleGet={getPlans}/>}/>
    );
};

export default CollectionPage;