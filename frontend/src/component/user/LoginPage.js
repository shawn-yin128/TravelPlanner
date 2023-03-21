import {useRef, useState} from "react";
import {login} from "../../utils/BackendUtils";
import {Button, Form, Input, message, Space} from "antd";
import {KeyOutlined, UserOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

const LoginPage = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef();

    const handleClick = async () => {
        const curForm = formRef.current;
        try {
            await curForm.validateFields();
        } catch (error) {
            return;
        }

        setIsLoading(true);
        try {
            const resp = await login(curForm.getFieldsValue(true));
            props.handleLogin(resp.token);
            message.success("Success Log In.");
            return navigate("/");
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Form ref={formRef}
                  style={{width: '35%', margin: '20px auto'}}
                  labelCol={{span: 8}}
                  wrapperCol={{span: 16}}>
                <Form.Item label="Username" name="username"
                           rules={[{required: true, message: "Please input your username."}]}>
                    <Input disabled={isLoading} prefix={<UserOutlined className="site-form-item-icon"/>}
                           placeholder="Username"/>
                </Form.Item>

                <Form.Item label="Password" name="password"
                           rules={[{required: true, message: "Please input your password."}]}>
                    <Input.Password disabled={isLoading} prefix={<KeyOutlined className="site-form-item-icon"/>}
                                    placeholder="Password"/>
                </Form.Item>
            </Form>
            <Space style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button disabled={isLoading} shape="round" type="primary" onClick={handleClick}>Log In</Button>
            </Space>
        </>
    );
}

export default LoginPage;