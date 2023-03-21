import {Autocomplete} from "@react-google-maps/api";
import {useState} from "react";

const PlaceAutoCompleteInput = (props) => {
    const [auto, setAuto] = useState(null);
    const {handleCenter, handleSelect} = props;

    const handleLoad = (autocomplete) => {
        setAuto(autocomplete);
    };

    const handlePlaceChange = () => {
        if (auto !== null) {
            const place = auto.getPlace();
            handleSelect(place);
            handleCenter({
                lat: (place.geometry.viewport.Va.lo + place.geometry.viewport.Va.hi) / 2,
                lng: (place.geometry.viewport.Ja.lo + place.geometry.viewport.Ja.hi) / 2
            });
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        <Autocomplete onLoad={handleLoad}
                      onPlaceChanged={handlePlaceChange}>
            <input type="text"
                   placeholder="Customized your placeholder"
                   style={{
                       boxSizing: "border-box",
                       border: "1px solid transparent",
                       width: "300px",
                       height: "40px",
                       padding: "0 12px",
                       borderRadius: "3px",
                       boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                       fontSize: "14px",
                       outline: "none",
                       textOverflow: "ellipses",
                       position: "absolute",
                       top: "10px",
                       left: "55%",
                       transform: "translateX(-50%)",
                       zIndex: "10"
                   }}
            />
        </Autocomplete>
    );
}

export default PlaceAutoCompleteInput;