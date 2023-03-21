import PlaceAutoCompleteInput from "./PlaceAutoCompleteInput";
import {Marker} from "@react-google-maps/api";
import InformationBox from "./InformationBox";

const SearchAddLayer = (props) => {
    const {handleSelect, handleCenter, handleAdd, center, selected} = props;

    return (
        <>
            <PlaceAutoCompleteInput handleSelect={handleSelect} handleCenter={handleCenter}/>
            {selected !== null &&
                <div style={{width: "fit-content"}}>
                    <Marker position={center}/>
                    <InformationBox center={center} data={selected} handleAdd={handleAdd} handleCancel={handleSelect}/>
                </div>
            }
        </>
    );
};

export default SearchAddLayer;