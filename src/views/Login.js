import React from "react";

function handleSubmit(e){
    e.preventDefault();
    //TODO: validate credentials and log in
}

function Login(){
    return (
        <div className="Login">
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Login: <input name="username"/>
                </label>
                <p>
                    <label>
                        Password: <input type="password" name="password"/>
                    </label>
                </p>
                <p>
                    <button type="submit">Zaloguj</button>
                </p>
            </form>
        </div>
    );
}

export default Login;