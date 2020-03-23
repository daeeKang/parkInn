import React from "react";

export default function GenerateParkingLotForm(props) {
    let numEl = null;

    const sendData = () => {
        props.parentCallback(numEl.value);
    };

    return (
        <div>
            Num of Spaces
            <input
                type="text"
                ref={input => {
                    numEl = input;
                }}
            />
            <button onClick={sendData}>dab</button>
        </div>
    );
}
