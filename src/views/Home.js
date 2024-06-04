//Home page, contains welcome message and button to login and signup pages

import React from "react";
import {useNavigate} from "react-router-dom";


function Home(){
    let navigate = useNavigate();
    return(
        <div className="Basic">
            <div className="HomeTitle">
                <b> Witaj </b>
            </div>
            <p>
                <button onClick={() => {navigate("/login")}}> Zaloguj się </button>
            </p>
            <p>
                <button onClick={() => {navigate("/signup")}}> Załóż konto </button>
            </p>
        </div>
    );
}

export default Home;