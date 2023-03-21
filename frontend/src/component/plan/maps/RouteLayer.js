import {useEffect, useState} from "react";
import {Alert} from "antd";
import {DirectionsRenderer, DirectionsService} from "@react-google-maps/api";

const RouteLayer = (props) => {
    const [response, setResponse] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [wayPoints, setWayPoints] = useState([]);
    const {plans} = props;

    useEffect(() => {
        if (plans.length >= 2) {
            let points = [];
            for (let i = 0; i < plans.length; i++) {
                if (i === 0) {
                    setOrigin(plans[i].geo);
                } else if (i === plans.length - 1) {
                    setDestination(plans[i].geo);
                } else {
                    const item = {location: plans[i].geo}
                    points = [...points, item];
                }
            }
            setWayPoints(points);
        }
    }, [plans]);

    const handleResponse = (res) => {
        if (res != null) {
            if (res.status === 'OK') {
                setResponse(res);
            }
        }
    };

    return (
        plans.length < 2 ?
            <Alert message="Error" type="error" showIcon closable
                   description={`Plan contains ${plans.length} places which are not enough for a route.`}/>
            :
            <>
                <DirectionsService callback={handleResponse}
                                   options={{
                                       origin: origin,
                                       destination: destination,
                                       waypoints: wayPoints,
                                       travelMode: 'DRIVING'
                                   }}/>
                {response !== null && <DirectionsRenderer options={{directions: response}}/>}
            </>
    );
};

export default RouteLayer;