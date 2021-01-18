import React, { useState } from "react";

export default function Calculator() {
    const [number, setNumber] = useState(0);
    const [sum, setSum] = useState(0);
    const [numberCount, setNumberCount] = useState(0);

    const submit = e => {
        e.preventDefault();
        setSum(parseInt(number) + parseInt(sum));
        setNumberCount(numberCount + 1);
    };

    return (
        <div className="CalcForm">
            <h3>SUM: {sum} AVG: {sum/numberCount}</h3>
            <form onSubmit={submit}>
                <input
                    value={number}
                    onChange={event => setNumber(event.target.value)}
                    type="number"
                    placeholder="Input number"
                    required
                />
                <button>ADD</button>
            </form>
        </div>
    );
}