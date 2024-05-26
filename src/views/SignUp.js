import React from "react"

function handleSubmit(e){
    e.preventDefault();
    //TODO: create new account
}

function SignUp(){
    return (
        <div className="SignUp">
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    Adres email: <input name="email"/>
                </label>
                <p>
                    <label>
                        Login: <input name="username"/>
                    </label>
                </p>
                <p>
                    <label>
                        Hasło: <input type="password" name="password"/>
                    </label>
                </p>
                <p>
                    <label>
                        Powtórz hasło: <input type="password" name="passwordRepeat"/>
                    </label>
                </p>
                <p>
                    <button type="submit">Załóż konto</button>
                </p>
            </form>
        </div>
    );
}

export default SignUp;
