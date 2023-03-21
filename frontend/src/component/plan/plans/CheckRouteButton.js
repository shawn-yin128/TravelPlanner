import {Switch} from "antd";

const CheckRouteButton = (props) => {
    const {handleRoute} = props;

    const handleSwitch = (e) => {
        handleRoute(e);
    };

    return (
        <Switch checkedChildren="Route On" unCheckedChildren="Route Off" onChange={handleSwitch}/>
    );
};

export default CheckRouteButton;