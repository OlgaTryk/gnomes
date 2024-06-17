//main view for logged in users, contains a map and a button to the user info page
import React, {useEffect, useState} from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {useNavigate, Link} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AUTH_KEY, GNOME_ID} from "../constants.js";


function Map() {
    let navigate = useNavigate();
    if(localStorage.getItem(AUTH_KEY) !== "true"){
        navigate("/")
    }
    let[gnomes, setGnomes] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            //GET all gnomes
            await fetch(`/gnomes`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(response => {
                if(!response.ok){
                    throw Error();
                }
                return response.json();
            }).then(responseData => {
                setGnomes(responseData.gnomes);
            }).catch(error => {
                console.log("Fetch failed");
            })
        }
        fetchData();
    }, []);

    return (
        <MapContainer center={[51.11374293464489, 17.03220983469276]} zoom={15} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       { gnomes && gnomes.map((data, key) => {
                return (
                    <div key={key}>
                        <Marker position={[data.location.split('|')[0].split(',')[0], data.location.split('|')[0].split(',')[1]]}>
                        <Popup position={[data.location.split('|')[0].split(',')[0], data.location.split('|')[0].split(',')[1]]}>
                            <Link to="/gnome" onClick={ () => {
                                 console.log(localStorage.getItem(GNOME_ID));
                                 localStorage.setItem(GNOME_ID, data.id)
                            }}> {data.name} </Link>
                        </Popup>
                        </Marker>
                    </div>
                    
                );
            }) }
        <IconButton className="showUserInfo" fontSize="large" onClick={() => navigate("/userInfo")}>
            <AccountCircleIcon className="userIcon" fontSize="large"/>
        </IconButton>
    </MapContainer>
    );
}

export default Map;