import {Button, message, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {deletePlan} from "../../utils/BackendUtils";
import {useState} from "react";

const DeletePlanButton = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const {planId} = props;

    const handleDelete = async () => {
        setIsLoading(true);

        try {
            await deletePlan(planId);
            message.success("Plan deleted.");
        } catch (error) {
            message.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Tooltip title="Delete Plan">
            <Button icon={<DeleteOutlined/>} onClick={handleDelete} disabled={isLoading}/>
        </Tooltip>
    );
};

export default DeletePlanButton;