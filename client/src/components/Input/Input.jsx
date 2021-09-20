import React from 'react';

const Input = ({ sendMessage, setMessage, message}) => {
    return (
        <div>
            <input type="text" onChange={ (e) => {
                setMessage(e.target.value);
            }}/>
            <button onClick={ sendMessage }>Send</button>
        </div>
    )
}

export default Input;