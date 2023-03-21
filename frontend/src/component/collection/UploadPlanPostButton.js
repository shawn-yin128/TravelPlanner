import {CloudUploadOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Tooltip} from "antd";
import {uploadPlanPost} from "../../utils/BackendUtils";

const UploadPlanPostButton = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const fileRef = useRef();
    const {plan} = props;

    const handleFinish = async (values) => {
        const formData = new FormData();
        const {files} = fileRef.current;
        console.log(files);
        formData.append("cover", files[0]);
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("plan_id", plan.id);

        setIsLoading(true);
        try {
            await uploadPlanPost(formData);
            message.success("Upload Successfully.");
            handleCancel();
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpen = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Tooltip title="Upload Plan">
                <Button icon={<CloudUploadOutlined/>}
                        onClick={handleOpen}/>
            </Tooltip>
            {visible &&
                <Modal open={visible}
                       closable={true}
                       footer={null}
                       onCancel={handleCancel}>
                    <Form onFinish={handleFinish}
                          labelCol={{span: 8}}
                          wrapperCol={{span: 16}}>
                        <Form.Item label="Title" name="title" rules={[{required: true}]}>
                            <Input value={plan.title}/>
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{required: true}]}>
                            <Input value={plan.description}/>
                        </Form.Item>
                        <Form.Item label="Covers" name="cover">
                            <input type="file" accept="image/png, image/jpeg" ref={fileRef} multiple={true}/>
                        </Form.Item>
                        <Form.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button type="primary" htmlType="submit" disabled={isLoading}>Upload</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </>
    );
};

export default UploadPlanPostButton;