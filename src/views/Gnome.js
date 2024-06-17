//shows info about a specific gnome, only shows description if visited by current user
//only available to logged in users
import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_KEY, GNOME_ID, USER_ID } from "../constants";

function visit(){
    //get visited gnome data
    const gnome_id = localStorage.getItem(GNOME_ID);
    const user_id = localStorage.getItem(USER_ID);
    const visitGnome = async() => {
        await fetch(`/users/${user_id}/gnomes/${gnome_id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => {
            if(!response.ok){
                throw Error();
            }
            return response.json();
        }).catch(error => {
            console.log(error)
        });
    }
    visitGnome();
}

function Gnome(){
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem(AUTH_KEY) !== "true"){
            navigate("/")
        }
    }, [navigate])
    let[visited, setVisited] = useState(false);
    let[success, setSuccess] = useState(0); // 0 - not loaded, 1 - load successfull, 2 - load failed
    let[name, setName] = useState("");
    let[location, setLocation] = useState("");
    let[description, setDescription] = useState("Opis można przeczytać po odwiedzeniu krasnala.");
    let[image, setImage] = useState("placeholder.png");
    useEffect(() => {
        //check if the user visited the gnome
        const gnome_id = localStorage.getItem(GNOME_ID);
        const user_id = localStorage.getItem(USER_ID);
        const fetchVisitTest = async() => {
            await fetch(`/users/${user_id}/gnomes/${gnome_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }).then(response => {
                if(response.status === 200){
                    setVisited(true);
                }
                else{
                    setVisited(false);
                }
                response.json()
            }).then(responseData => {
                
            }).catch(error => {
                console.log(error);
            });
        }
        fetchVisitTest();
    }, []);
    useEffect(() => {
        //get visited gnome data
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
                setName(responseData.gnome[0].name);
                const loc = responseData.gnome[0].location.split('|') 
                setLocation(loc[1]);
                setDescription(responseData.gnome[0].description);
                if(responseData.gnome[0].image){
                    setImage(responseData.gnome[0].image);
                }
                setSuccess(1);
            }).catch(error => {
                setSuccess(2);
                console.log(error);
            });
        }
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
                return response.json();
            }).then(responseData => {
                setName(responseData.gnome.name);
                const loc = responseData.gnome.location.split('|') 
                setLocation(loc[1]);
                setDescription(responseData.gnome.description);
                if(responseData.gnome.image){
                    setImage(responseData.gnome.image);
                }
                setSuccess(1);
            }).catch(error => {
                console.log(error)
                setSuccess(2);
            });
        }
        if(visited){
            fetchVisit();
        }
        else{
            fetchData();
        }
    }, [visited]);
    return(
        <div className="Gnome"> 
            <Link to="/map"> Wróć do mapy</Link>
            { success === 2 && <p> Błąd ładowania danych. Spróbuj ponownie. </p>}
            { success === 1 && 
            <div>
                <p> {name} </p>
                <p> <img width={320} height={480} src={'./images/' + image} onError={e => {
                    setImage("placeholder.png");
                    e.currentTarget.src = './images/' + image;
                    }} alt={"Zdjęcie krasnala"}/> </p>
                <p>Lokalizacja: {location} </p>
                { visited ? <p> Opis: {description} </p>: <p> Opis można przeczytać po odwiedzeniu krasnala. </p>}
                { visited === false && <button onClick={() => {
                    visit()
                    setVisited(true)
                }}> Odwiedź </button>}
            </div>
            }
        </div>
    )
}

export default Gnome;