import React, { useState } from "react";

export default function AllForm() {
    const [textOne, setTextOne] = useState();
    const [textTwo, setTextTwo] = useState();
    const [droplist, setDroplist] = useState("One");
    const [checkbox, setCheckbox] = useState(false);
    const [radio, setRadio] = useState("A");
    const [sent, setSent] = React.useState(false)

    const submit = e => {
        e.preventDefault();
        setSent(true)
    }

    const reset = () => {
        setTextOne("");
        setTextTwo("");
        setDroplist("Mężczyzna");
        setCheckbox(false);
    }

    return (
        <div className="AllForm">
            {!sent ?
                <form onSubmit={submit}>
                    <label>Text One</label><input value={textOne} type="text" required onChange={(e) => setTextOne(e.target.value)}/><br/>
                    <label>Text Two</label><input value={textTwo} type="text" required onChange={(e) => setTextTwo(e.target.value)}/><br/>
                    <label>A:</label><input name="letter" type="radio" onChange={() => setRadio("A")} defaultChecked/><br/>
                    <label>B:</label><input name="letter" type="radio" onChange={() => setRadio("B")}/><br/>
                    <input type="checkbox" checked={checkbox} onChange={() => setCheckbox(!checkbox)}/><br/>
                    <label>Droplist</label>
                    <select value={droplist} onChange={(e) => setDroplist(e.target.value)} required>
                        <option value="One">One</option>
                        <option value="Two">Two</option>
                        <option value="Three">Three</option>
                        <option value="Four">Four</option>
                    </select><br/>
                    <button onClick={() => reset()}>Reset</button>
                    <input type="submit" value="oblicz"/>
                </form>
                :
                <div className="Table">
                    <table>
                        <tbody>
                            <tr>
                                <td>Text One</td>
                                <td>{textOne}</td>
                            </tr>
                            <tr>
                                <td>Text Two</td>
                                <td>{textTwo}</td>
                            </tr>
                            <tr>
                                <td>Radio</td>
                                <td>{radio}</td>
                            </tr>
                            <tr>
                                <td>Checkbox</td>
                                <td>{checkbox ? "true" : "false"}</td>
                            </tr>
                            <tr>
                                <td>Droplist</td>
                                <td>{droplist}</td>
                            </tr>
                        </tbody>
                        <button onClick={() => setSent(false)}>Reset</button>
                    </table>
                </div>
            }
        </div>
    );
}