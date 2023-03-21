import {Button, DatePicker, Form, Input, message, Modal, Tooltip} from "antd";
import {useState} from "react";
import {CarryOutOutlined} from "@ant-design/icons";
import {savePlan} from "../../../utils/BackendUtils";

const AddPlanButton = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const {plans} = props;

    const handleFinish = async (form) => {
        if (plans.length === 0) {
            message.error("Plan contains invalid daily plan number.");
        }

        setIsLoading(true);
        const req = {
            title: form.title,
            description: form.description,
            start_date: form.date_range[0].format("YYYY-MM-DD"),
            end_date: form.date_range[1].format("YYYY-MM-DD")
        };
        console.log(plans);
        let dailyPlans = [];
        for (const daily of plans) {
            const item = {};
            item.date = daily.date.replace(" ", "T");
            item.description = daily.description;
            item.place = daily.place;
            item.location_id = daily.location_id;
            item.lat = daily.geo.lat;
            item.lng = daily.geo.lng;
            dailyPlans = [...dailyPlans, item];
        }
        req.plan_details = dailyPlans;
        console.log(req);

        try {
            await savePlan(req);
            message.success("Save plan successfully.");
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
            <Tooltip title="Save Plan">
                <Button size="small"
                        type="primary"
                        icon={<CarryOutOutlined/>}
                        onClick={handleOpen}>
                    Save
                </Button>
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
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Date Range" name="date_range" rules={[{required: true}]}>
                            <DatePicker.RangePicker/>
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

export default AddPlanButton;