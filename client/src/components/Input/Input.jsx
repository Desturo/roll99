import React from 'react';

const Input = ({ sendMessage }) => {
    return (
        <div>
            <input type="text"/>
            <button onClick={ sendMessage }>Send</button>
        </div>
    )
}

export default Input;