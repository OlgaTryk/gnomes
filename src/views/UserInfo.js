//show user info: username, email, visited gnomes, and unlocked achievements
import { React, useEffect, useState } from "react";
import { AUTH_KEY, GNOME_ID, USER_ID } from "../constants";
import { useNavigate } from "react-router-dom";

function onSeeMore(id, navigate){
    localStorage.setItem(GNOME_ID, id);
    navigate("/gnome")
}

function UserInfo(){
    let navigate = useNavigate();
    if(localStorage.getItem(AUTH_KEY) !== "true"){
        navigate("/")
    }
    const[success, setSuccess] = useState(0); //0 - not loaded, 1 - load successfull, 2 - load failed
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[gnomes, setGnomes] = useState([]);
    const[achievements, setAchievements] = useState([]);
    useEffect(() => {
        //GET user data
        const fetchData = async () => {
            const user_id = localStorage.getItem(USER_ID)
            await fetch(`/users/${user_id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            ).then(response => {
                if(response.ok){
                    setSuccess(1);
                }
                else{
                    throw Error("Fetch failed");
                }
                return response.json();
            }).then(responseData => {
                setUsername(responseData.user.username);
                setEmail(responseData.user.email);
            }).catch(error => {
                setSuccess(2);
            })
        }
        fetchData();
        //GET list of visited gnomes
        const fetchGnomes = async() => {
            const user_id = localStorage.getItem(USER_ID)
            await fetch(`/users/${user_id}/gnomes`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            ).then(response => {
                if(response.ok){
                    setSuccess(1);
                }
                else{
                    throw Error("Fetch failed");
                }
                return response.json();
            }).then(responseData => {
                setGnomes(responseData.gnomes);
            }).catch(error => {
                setSuccess(2);
            })
        }
        fetchGnomes();
        //GET list of unlocked achievements
        const fetchAchievements = async() => {
            const user_id = localStorage.getItem(USER_ID)
            await fetch(`/users/${user_id}/achievements`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            ).then(response => {
                if(response.ok){
                    setSuccess(1);
                }
                else{
                    throw Error("Fetch failed");
                }
                return response.json();
            }).then(responseData => {
                setAchievements(responseData.achievements);
            }).catch(error => {
                setSuccess(2);
            })
        }
        fetchAchievements();
    }, []);
    //lists are only rendered if they are not empty
    return(
    <div className="Basic">
        {success === 2 && <p> Błąd ładowania danych. Spróbuj ponownie</p>}
        {
            success === 1 &&
            <div className="UserInfo">
            <p> Nazwa użytkownika: {username} </p>
            <p> Adres email: {email} </p>
            {   
                gnomes &&
                <div>
                <p> Odwiedzone krasnale:</p>
                {gnomes.map((data, key) => {
                    return (
                        <div className="List" key={key}>
                            {
                                data.id + ". " + data.name + " "
                            }
                            <button onClick={() => onSeeMore(data.id, navigate)}> Zobacz szczegóły </button>
                        </div>
                    )
                })}
                </div>
            }
            {   
                achievements &&
                <div>
                <p> Odblokowane osiągnięcia:</p>
                {achievements.map((data, key) => {
                    return (
                        <div className="List" key={key}>
                            {
                                data.name + ": " + data.condition
                            }
                        </div>
                    )
                })}
                </div>
            }
            </div>
        } 
        { success !== 0 && 
            <button onClick={() => {
            localStorage.setItem(AUTH_KEY, false);
            localStorage.setItem(USER_ID, 0);
            navigate("/");
        }}> Wyloguj </button>}
        
    </div>
    );
}

export default UserInfo;