import React from "react";

export default function UserTable({user, logout = f => f}) {
    return(
        <table>
            <tbody>
                <tr>
                    <td>Imię</td>
                    <td>{user.name}</td>
                </tr>
                <tr>
                    <td>Nazwisko</td>
                    <td>{user.surname}</td>
                </tr>
                <tr>
                    <td>E-mail</td>
                    <td>{user.email}</td>
                </tr>
                <tr>
                    <td>Data urodzenia</td>
                    <td>{user.birthdate}</td>
                </tr>
                <tr>
                    <td>Hasło</td>
                    <td>{user.password}</td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button onClick={logout}>Wyloguj</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}