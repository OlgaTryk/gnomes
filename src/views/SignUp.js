//sign up page, allows the user to create a new account
import {React, Component} from "react"
import bdcrypt from "bcryptjs"
import { Navigate, Link } from "react-router-dom";
import { AUTH_KEY , USER_ID} from "../constants";

class SignUp extends Component{
    constructor(props) {
        super(props);
        // 0 - no  attempts, 1 - user created, 2 - wrong email, 3 - passwords don't match,
        // 4 - post fail, 5 - some fields are empty
        this.state = {flag: 0};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event){
        event.preventDefault();
        const email = event.target.email.value
        const username = event.target.username.value
        const password = event.target.password.value
        const passwordRepeat = event.target.passwordRepeat.value
        //check if given string is (close to) a valid email address
        var regex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
        if(!regex.test(email)){
            //the string is not an email address
            this.setState({flag: 2})
        }
        else if (password !== passwordRepeat){
            //passwords are different
            this.setState({flag: 3})
        }
        else if(!email || !username || !password || !passwordRepeat){
            //at least one of the fields is empty
            this.setState({flag: 5})
        }
        else{
            //hash the password with a generated salt
            const hashedPassword = bdcrypt.hashSync(password, bdcrypt.genSaltSync(10))
            //POST request to the Users table with given data
            const fetchData = async() => {
                await fetch('/users', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify({
                        "username": username,
                        "email": email,
                        "password": hashedPassword
                    })
                }
                ).then((response) => {
                    if(!response.ok){
                        //error if response status is not 2xx
                        throw Error("Failed to create user")
                    }
                    return response.json();
                }).then(responseData => {
                    //account was created, log user into the new account
                    localStorage.setItem(USER_ID, responseData.id);
                    localStorage.setItem(AUTH_KEY, true);
                    this.setState({flag: 1})
                }).catch(error => {
                    //POST failed, could mean a failure to add to database
                    console.log(error);
                    this.setState({flag: 4})
                })
            }
            fetchData();
        }
    }
    render(){
        return (
            <div className="Basic">
                <Link to="/"> Strona główna</Link>
                { this.state.flag === 1 && <Navigate to="/map"/> }
                <form method="post" onSubmit={this.handleSubmit}>
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
                { this.state.flag === 2 && <p> Podany adres email jest niepoprawny. </p>}
                { this.state.flag === 3 && <p> Podane hasła różnią się. </p>}
                { this.state.flag === 4 && <p> Utworzenie konta nie powiodło się. </p>}
                { this.state.flag === 5 && <p> Nie podano wszystkich wymaganych danych. </p>}
            </div>
        );
    } 
}

export default SignUp;
