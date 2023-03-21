import {Button, Form, Input, message, Space} from "antd";
import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {UserOutlined, KeyOutlined} from "@ant-design/icons";
import {register} from "../../utils/BackendUtils";

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
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
            await register(curForm.getFieldsValue(true));
            message.success("Register successfully.");
        } catch (error) {
            message.error(error.messages);
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
                <Form.Item label="Username"
                           name="username"
                           rules={[{required: true, message: "Please input your username."}]}>
                    <Input disabled={isLoading}
                           prefix={<UserOutlined/>}
                           placeholder="Username"/>
                </Form.Item>

                <Form.Item label="Password" name="password"
                           rules={[{required: true, message: "Please input your password."}]}>
                    <Input.Password disabled={isLoading} prefix={<KeyOutlined/>} placeholder="Password"/>
                </Form.Item>

                <Form.Item name="confirm"
                           label="Confirm Password"
                           dependencies={['password']}
                           hasFeedback
                           rules={[{
                               required: true,
                               message: 'Please confirm your password!',
                           },
                               ({getFieldValue}) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('password') === value) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                   },
                               }),
                           ]}
                >
                    <Input.Password disabled={isLoading} prefix={<KeyOutlined/>} placeholder="Password"/>
                </Form.Item>
            </Form>
            <Space style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button disabled={isLoading} shape="round" type="primary" onClick={handleClick}>Register</Button>
                <Link to="/login">
                    <Button disabled={isLoading} shape="round" type="primary">To Log In</Button>
                </Link>
            </Space>
        </>
    );
}

export default RegisterPage;