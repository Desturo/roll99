import React from 'react';

const Form = () => {
    const handleSubmit = () => {
        
    }
    
    return (
        <form autoComplete="off" onSubmit={ handleSubmit }>
            <label htmlFor="fristName">First Name: &nbsp;</label>
            <input type="text" name="firstName" /> <br />

            <label htmlFor="lastName">Last Name: &nbsp;</label>
            <input type="text" name="lastName" /> <br />

            <label htmlFor="creator">Creator: &nbsp;</label>
            <input type="text" name="creator" /> <br />

            <label htmlFor="race">Race: &nbsp;</label>
            <input type="text" name="race" /> <br />

            <label htmlFor="origin">Origin: &nbsp;</label>
            <input type="text" name="origin" /> <br />

            <div>
                <label htmlFor="abilityName">Ability Name: &nbsp;</label>
                <input type="text" name="abilityName" /> <br />

                <label htmlFor="abilityValue">Ability Value: &nbsp;</label>
                <input type="text" name="abilityValue" /> <br />

                <button>Add Ability</button>
            </div>

            <label htmlFor="strength">Strength: &nbsp;</label>
            <input type="Number" name="strength" /> <br />

            <label htmlFor="endurance">Endurance: &nbsp;</label>
            <input type="Number" name="endurance" /> <br />

            <label htmlFor="agility">Agility: &nbsp;</label>
            <input type="Number" name="agility" /> <br />

            <label htmlFor="intelligence">Intelligence: &nbsp;</label>
            <input type="Number" name="intelligence" /> <br />

            <label htmlFor="magic">Magic: &nbsp;</label>
            <input type="Number" name="magic" /> <br />

            <label htmlFor="speed">Speed: &nbsp;</label>
            <input type="Number" name="speed" /> <br />
        </form>
    )
}

export default Form;