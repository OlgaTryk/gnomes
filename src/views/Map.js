import React, {useState} from "react";
import {MapContainer, TileLayer, useMapEvents} from "react-leaflet"
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// click on the map to recenter to current location
function Locate() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })
}

function Map() {
    let navigate = useNavigate();
    return (
        <MapContainer center={[51.10783984131171, 17.06110885722262]} zoom={20} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Locate/>
            <IconButton className="showUserInfo" size="large" onClick={() => navigate("/userInfo")}>
                <AccountCircleIcon className="userIcon" />
            </IconButton>
        </MapContainer>
    );
}

export default Map;