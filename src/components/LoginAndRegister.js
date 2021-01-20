import React , { useState } from "react";
import '../App.css';

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UserTable from "./UserTable";

import userData from "../data/credentials";

export default function LoginAndRegister() {

    const [users, setUsers] = useState(userData);
    const [displayRegister, setDisplayRegister] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    function registerHandler(user) {
        let userList = [...users];
        userList.push(user);
        setUsers(userList);
    }

    function loginHandler(user) {
        setCurrentUser(user);
    }

    function logoutHandler() {
        setCurrentUser(null);
    }

    return (
        <>
            {currentUser ?
                <UserTable logout={logoutHandler} user={currentUser}/>
                :
                <>
                    {displayRegister ?
                        <>
                            <RegisterForm registerHandler={registerHandler}/>
                            <br/>
                            <button onClick={() => setDisplayRegister(false)}>Login</button>
                        </>
                        :
                        <>
                            <LoginForm userData={users} loginHandler={loginHandler}/>
                            <br/>
                            <button onClick={() => setDisplayRegister(true)}>Register</button>
                        </>
                    }
                </>
            }
        </>
    )
}