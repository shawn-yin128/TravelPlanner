import {useState} from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {googleMapKey, googleMapLibraries} from "../../constants";
import {Spin} from "antd";
import SearchAddLayer from "./maps/SearchAddLayer";
import RouteLayer from "./maps/RouteLayer";

const PlanSearchBlock = (props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: googleMapKey, libraries: googleMapLibraries
    });
    const [selected, setSelected] = useState(null);
    const [center, setCenter] = useState({lat: 40.76, lng: -73.98});
    const {route, plans, handleAdd} = props;

    return (isLoaded ?
            <GoogleMap zoom={15}
                       center={center}
                       mapContainerStyle={{width: '100%', height: '87vh', borderRadius: '10px'}}
                       clickableIcons={false}>
                {route ?
                    <RouteLayer plans={plans}/>
                    :
                    <SearchAddLayer handleSelect={setSelected} handleCenter={setCenter} handleAdd={handleAdd}
                                    center={center} selected={selected}/>
                }
            </GoogleMap>
            :
            <Spin/>
    );
}

export default PlanSearchBlock;