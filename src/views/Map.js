//main view for logged in users, contains a map and a button to the user info page
import React, {useEffect} from "react";
import {MapContainer, TileLayer, useMap} from "react-leaflet"
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Recenter = () => {
    //centers map on current location on refresh
    const map = useMap();
    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            map.setView(e.latlng);
        })
    });
    return null;
}

function Map() {
    let navigate = useNavigate();
    return (
        <MapContainer center={[51.10783984131171,17.06110885722262]} zoom={20} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Recenter />
            <IconButton className="showUserInfo" fontSize="large" onClick={() => navigate("/userInfo")}>
                <AccountCircleIcon className="userIcon" fontSize="large"/>
            </IconButton>
        </MapContainer>
    );
}

export default Map;