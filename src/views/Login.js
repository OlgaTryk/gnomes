//login page, verifies user credentials

import { React, Component} from "react";
import { Navigate, Link } from "react-router-dom";
import { AUTH_KEY, USER_ID } from "../constants";
import bdcrypt from "bcryptjs"

class Login extends Component{
    constructor(props) {
        super(props);
        // 0 - no login attempt, 1 - error, 2 - wrong password, 3 - logged in, 4 - some fields are empty
        this.state = {flag: 0, password: "", id: 0};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const username = event.target.username.value
        const password = event.target.password.value
        if(!username || !password){
            this.setState({flag: 4})
        }
        else{
            //GET user data based on username
            const fetchData = async () => {
                await fetch(`/user/${username}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }
                ).then((response) => {
                    if(!response.ok){
                        //error if response status is not 2xx
                        throw Error("Fetch failed")
                    }
                    return response.json()
                }).then(responseData => {
                    //validate password
                    const match = bdcrypt.compareSync(password, responseData.user.password);
                        if(match){
                            //valid password, user is now logged in
                            localStorage.setItem(AUTH_KEY, true);
                            localStorage.setItem(USER_ID, responseData.user.id);
                            this.setState({flag: 3})
                        }
                        else{
                            //wrong password
                            this.setState({flag: 2})
                        }
                    }).catch(error => {
                    this.setState({flag: 1})
                });
               }
               fetchData();
        }
    }

    render(){
        return (
            <div className="Basic">
                <Link to="/"> Strona główna</Link>
                { this.state.flag === 3 && <Navigate to="/map" />}
                <form method="post" onSubmit={this.handleSubmit}>
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
                { this.state.flag === 1 && <p> Próba logowania nie powiodła się. </p>}
                { this.state.flag === 2 && <p> Podane hasło jest nieprawidłowe. </p>}
                { this.state.flag === 4 && <p> Nie podano wszystkich wymaganych danych. </p>}
            </div>
        );
    }    
}

export default Login;