import React from "react";
import '../App.css'

export default function RegisterForm({registerHandler = f => f}) {


    const [credentials, setCredentials] = React.useState({})
    const [errors, setErrors] = React.useState({})


    const submit = (event) => {
        event.preventDefault()
        if (validate("", credentials, true)) {
            registerHandler(credentials);
            alert("Zarejestrowano!");
        }
    }

    const changeHandler = (event) => {
        let input = {...credentials};
        if (event.target.type === "checkbox") {
            input[event.target.name] = !input[event.target.name]
        } else {
            input[event.target.name] = event.target.value;
        }
        validate(event.target.name, input, false);
    }

    const validate = (fieldName, inp) => {
        let input = {...inp}
        let invalid = true;
        let errs = {...errors}
        delete errs["message"]
        if (fieldName === "email") {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                errs["email"] = "To nie jest adres email";
                invalid = false;
            } else {
                delete errs["email"];
            }
        }
        if (fieldName === "password") {
            let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (!pattern.test(input["password"])) {
                errs["password"] = "Twoje hasło jest zbyt słabe";
                invalid = false;
            } else {
                delete errs["password"];
            }
        }
        if (fieldName === "birthdate") {
            let userDate = new Date(input["birthdate"]);
            let now = parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, ''));
            let dob = userDate.getFullYear() * 10000 + userDate.getMonth() * 100 + userDate.getDay();

            if (now - dob < 180000) {
                errs["birthdate"] = "Nie jesteś pełnoletni";
                invalid = false;
            } else {
                delete errs["birthdate"];
            }
        }
        setErrors(errs);
        setCredentials(input);
        return invalid;
    }

    const reset = () => {
        setCredentials({
            name: "",
            surname: "",
            email: "",
            password: "",
            birthdate: "",
            agreement: false,
            image: ""
        });
        setErrors({});
    }

    return (
        <form onSubmit={submit}>
            <label>Imię:</label>
            <input value={credentials.name} type="text" name="name" onChange={changeHandler} required/><br/>

            <label>Nazwisko:</label>
            <input value={credentials.surname} type="text" name="surname" onChange={changeHandler} required/><br/>

            <label>E-mail:</label>
            <input value={credentials.email} name="email" type="text" onChange={changeHandler} required/><br/>
            <div className="error">{errors.email}</div>

            <label>Hasło:</label>
            <input value={credentials.password} name="password" type="password" onChange={changeHandler} required/><br/>
            <div className="error">{errors.password}</div>

            <label>Zdjęcie:</label>
            <input type="file" accept="image/*" name="image" onChange={changeHandler}/>

            <label>Data urodzenia:</label>
            <input value={credentials.birthdate} name="birthdate" type="date" onChange={changeHandler} required/><br/>
            <div className="error">{errors.birthdate}</div>

            <label>Wyraź zgodę:</label>
            <input type="checkbox" checked={credentials.agreement} name="agreement" onChange={changeHandler} required/><br/>
            <div className="error">{errors.agreement}</div>

            <button type="button"  onClick={() => reset()}>Reset</button>
            <input type="submit" value="Rejestruj"/>
            <div className="error">{errors.message}</div>
        </form>
    );
}