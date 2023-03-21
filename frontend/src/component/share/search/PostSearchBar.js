import {Button, Form, Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {searchPlanPost} from "../../../utils/BackendUtils";
import {useState} from "react";

const PostSearchBar = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const {handleSearch} = props;

    const handleFinish = async (values) => {
        setIsLoading(true);
        const data = await searchPlanPost(values.keyword);
        handleSearch(data);
        setIsLoading(false);
    };

    return (
        <Form layout="inline" onFinish={handleFinish}>
            <Form.Item label="Keywords" name="keyword" rules={[{required: true}]} style={{width: '50vh'}}>
                <Input size="middle" placeholder="Please enter keyword to search." prefix={<SearchOutlined/>}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={isLoading}>Search</Button>
            </Form.Item>
        </Form>
    );
};

export default PostSearchBar;