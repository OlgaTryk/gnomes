//shows info about a specific gnome, only shows description if visited by current user
//only available to logged in users
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GNOME_ID, USER_ID } from "../constants";

function Gnome(){
    let[success, setSuccess] = useState(0); // 0 - not loaded, 1 - load successfull, 2 - load failed
    let[name, setName] = useState("");
    let[location, setLocation] = useState("");
    let[description, setDescription] = useState("Opis można przeczytać po odwiedzeniu krasnala.");
    let[image, setImage] = useState("placeholder.png");
    useEffect(() => {
        let visited = false;
        //check if the user visited the gnome, get visited gnome data
        const gnome_id = localStorage.getItem(GNOME_ID);
        const user_id = localStorage.getItem(USER_ID);
        const fetchVisit = async() => {
            await fetch(`/users/${user_id}/gnomes/${gnome_id}`, {
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
                visited = true;
                setName(responseData.gnome[0].name);
                const loc =responseData.gnome[0].location.split('|') 
                setLocation(loc[1]);
                setDescription(responseData.gnome[0].description);
                if(responseData.gnome[0].image){
                    setImage(responseData.gnome[0].image);
                }
                setSuccess(1);
            }).catch(error => {
                console.log(error);
                setSuccess(2);
            });
        }
        fetchVisit();
        //GET gnome data (if not visited)
        const fetchData = async() => {
            await fetch(`/gnomes/${gnome_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(response => {
                if(!response.ok){
                    throw Error();
                }
            }).then(responseData => {
                setName(responseData.gnome[0].name);
                const loc =responseData.gnome[0].location.split('|') 
                setLocation(loc[1]);
                setDescription(responseData.gnome[0].description);
                if(responseData.gnome[0].image){
                    setImage(responseData.gnome[0].image);
                }
                setSuccess(1);
            }).catch(error => {
                setSuccess(2);
            });
        }
        if(!visited){
            fetchData();
        }
    }, []);
    return(
        <div className="Gnome"> 
            <Link to="/map"> Wróć do mapy</Link>
            { success === 2 && <p> Błąd ładowania danych. Spróbuj ponownie. </p>}
            { success === 1 && 
            <div>
                <p> {name} </p>
                <p> <img width={200} height={300} src={"/images/" + image} onError={e => {
                    setImage("placeholder.png");
                    e.currentTarget.src = image;
                    }} alt={"Zdjęcie krasnala"}/> </p>
                <p>Lokalizacja: {location} </p>
                <p> Opis: {description} </p>
            </div>
            }
        </div>
    )
}

export default Gnome;