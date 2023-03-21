import {Button, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

const DeleteDailyPlanButton = (props) => {
    const {data, handleDelete} = props;

    const handleClick = () => {
        handleDelete(data);
    };

    return (
        <Tooltip title="Delete Plan">
            <Button icon={<DeleteOutlined/>}
                    onClick={handleClick}/>
        </Tooltip>
    );
};

export default DeleteDailyPlanButton;