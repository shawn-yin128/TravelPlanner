import {Avatar, Card, Image, List, Space} from "antd";
import CheckPostPlanDetailButton from "../search/CheckPostPlanDetailButton";
import Text from "antd/lib/typography/Text";
import DeletePostButton from "./DeletePostButton";

const ManagementPreBlock = (props) => {
    const {posts} = props;

    return (
        <List grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
        }}
              dataSource={posts}
              renderItem={item => (
                  <List.Item>
                      <Card cover={<Image src={item.cover}/>}
                            actions={[<CheckPostPlanDetailButton planId={item.plan_id}/>, <DeletePostButton postId={item.id}/>]}>
                          <Card.Meta title={item.title}
                                     description={
                                         <div style={{maxHeight: '100px', overflow: 'scroll'}}>
                                             <Space direction="vertical">
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

export default ManagementPreBlock;