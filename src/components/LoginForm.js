import React, { useState } from "react";
import userData from "../data/credentials"

export default function LoginForm({onLogin = f => f}) {

    const [credentials, setCredentials] = useState({
        email: "",
        pass: ""
    });

    const [error, setError] = React.useState("");

    const [logged, setLogged] = useState(false);

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validate() {
        let error;

        if(!validateEmail(credentials["email"])) {
            error = "To nie jest adres email";
        }

        for(const user of userData) {
            if (credentials["email"] === user.email && credentials["pass"] === user.password) {
                setError("");
                return user;
            }
        }
        error = "Nieprawidłowy email lub hasło"
        setError(error);
        return false;
    }

    function submit(e) {
        e.preventDefault();
        let user = validate();
        if(user !== false) {
            setLogged(true);
            onLogin(user);
        }
    }

    return (
        <form onSubmit={submit}>
            <p>{error}</p>
            <label>E-mail</label><input value={credentials.email} type="text" required onChange={
                (e) => {setCredentials({email: e.target.value, pass: credentials.pass})}
            }/>
            <label>Password</label><input value={credentials.pass} type="password" required onChange={
                (e) => {setCredentials({email: credentials.email, pass: e.target.value})}
            }/>
            <input type="submit" value="Loguj"/>
            {logged && <p>Zalogowano pomyślnie</p>}
        </form>
    )
}