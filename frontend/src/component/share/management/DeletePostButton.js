import {Button, message, Tooltip} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {deletePlanPost} from "../../../utils/BackendUtils";

const DeletePostButton = (props) => {
    const {postId} = props;

    const handleOpen = async () => {
        try {
            await deletePlanPost(postId);
            message.success("Delete plan successfully.");
        } catch (error ) {
            message.error(error.message);
        }
    };

    return (
        <Tooltip title="Delete Plan">
            <Button icon={<DeleteOutlined/>}
                    onClick={handleOpen}/>
        </Tooltip>
    );
};

export default DeletePostButton;