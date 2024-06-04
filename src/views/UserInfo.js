//show user info: username, email, visited gnomes, and unlocked achievements
import { React, useEffect, useState } from "react";
import { USER_ID } from "../constants";

function UserInfo(){
    const[success, setSuccess] = useState(false); //true if all the info was successfully loaded
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
                    setSuccess(true);
                }
                else{
                    throw Error("Fetch failed");
                }
                return response.json();
            }).then(responseData => {
                setUsername(responseData.user.username);
                setEmail(responseData.user.email);
            }).catch(error => {
                setSuccess(false);
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
                    setSuccess(true);
                }
                else{
                    throw Error("Fetch failed");
                }
                return response.json();
            }).then(responseData => {
                setGnomes(responseData.gnomes);
            }).catch(error => {
                setSuccess(false);
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
                    setSuccess(true);
                }
                else{
                    throw Error("Fetch failed");
                }
                return response.json();
            }).then(responseData => {
                setAchievements(responseData.achievements);
            }).catch(error => {
                setSuccess(false);
            })
        }
        fetchAchievements();
    }, []);
    //lists are only rendered if they are not empty
    return(
    <div className="Basic">
        {!success && <p> Błąd ładowania danych. Spróbuj ponownie</p>}
        {
            success &&
            <div className="UserInfo">
            <p> Nazwa użytkownika: {username} </p>
            <p> Adres email: {email} </p>
            {   
                gnomes &&
                <div>
                <p> Odwiedzone krasnale:</p>
                {gnomes.map((data, key) => {
                    return (
                        <div key={key}>
                            {
                                data.id + ". " + data.name
                            }
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
                        <div key={key}>
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
    </div>
    );
}

export default UserInfo;