//Home page, contains welcome message and button to login and signup pages

import React from "react";
import {useNavigate} from "react-router-dom";
import { AUTH_KEY, USER_ID } from "../constants";


function Home(){
    let navigate = useNavigate();
    return(
        <div className="Basic">
            <div className="HomeTitle">
                <b> Witaj </b>
            </div>
            {localStorage.getItem(AUTH_KEY) === "true" ? 
                <div> 
                    <p>
                        <button onClick={() => {navigate("/map")}}> Przejdź do mapy </button>
                    </p>
                    <p>
                        <button onClick={() => { 
                            localStorage.setItem(AUTH_KEY, false)
                            localStorage.setItem(USER_ID, 0)
                            navigate("/")}
                            }> Wyloguj </button>
                    </p>
                </div> : 
                <div>
                    <p>
                        <button onClick={() => {navigate("/login")}}> Zaloguj się </button>
                    </p>
                    <p>
                        <button onClick={() => {navigate("/signup")}}> Załóż konto </button>
                    </p>
                </div>
            }
        </div>
    );
}

export default Home;