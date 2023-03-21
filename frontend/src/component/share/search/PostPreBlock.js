import {Card, List, Space, Image, Avatar} from "antd";
import Text from "antd/lib/typography/Text";
import CheckPostPlanDetailButton from "./CheckPostPlanDetailButton";

const PostPreBlock = (props) => {
    const {data} = props;

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
                      <Card cover={<Image src={item.cover}/>}
                            actions={[<CheckPostPlanDetailButton planId={item.plan_id}/>]}>
                          <Card.Meta title={item.title}
                                     avatar={<Avatar src="https://joesch.moe/api/v1/random"/>}
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

export default PostPreBlock;