import {PlusOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, Modal, Tooltip} from "antd";
import {useState} from "react";

const AddDailyPlanButton = (props) => {
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {data, handleAdd} = props;

    const handleFinish = (form) => {
        setIsLoading(true);
        const dailyPlan = form;
        dailyPlan.date = form.date.format("YYYY-MM-DD HH:mm:ss");
        dailyPlan.place = data.name;
        dailyPlan.location_id = data.place_id;
        dailyPlan.geo = {
            lat: (data.geometry.viewport.Va.lo + data.geometry.viewport.Va.hi) / 2,
            lng: (data.geometry.viewport.Ja.lo + data.geometry.viewport.Ja.hi) / 2
        }

        handleAdd(dailyPlan);
        setIsLoading(false);
        handleCancel();
    };

    const handleOpen = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Tooltip title="Add Plan">
                <Button size="small"
                        icon={<PlusOutlined/>}
                        onClick={handleOpen}/>
            </Tooltip>
            {visible &&
                <Modal title={data.name}
                       open={visible}
                       closable={true}
                       footer={null}
                       onCancel={handleCancel}>
                    <Form onFinish={handleFinish}
                          labelCol={{span: 4}}
                          wrapperCol={{span: 16}}>
                        <Form.Item label="Date" name="date" rules={[{required: true}]}>
                            <DatePicker showTime="true"/>
                        </Form.Item>
                        <Form.Item label="Note" name="description" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button type="primary" htmlType="submit" disabled={isLoading}>Add to Plan</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            }
        </>
    );
};

export default AddDailyPlanButton;