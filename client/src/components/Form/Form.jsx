import Cookies from "js-cookie";
import { React, useState } from "react";

import * as api from "../../api";
import auth from "../../logic/auth";

const Form = (props) => {
  const [ability, setAbility] = useState({
    name: "",
    value: 0,
  });

  const [character, setCharacter] = useState({
    firstName: "",
    lastName: "",
    creator: "",
    race: "",
    origin: "",
    abilities: [],
    attributes: {
      strength: 0,
      endurance: 0,
      agility: 0,
      intelligence: 0,
      magic: 0,
      speed: 0,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await api.createCharacter(character);
    console.log(data);
  };

  const addAbility = async () => {
    await setCharacter({
      ...character,
      abilities: [...character.abilities, ability],
    });
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="fristName">First Name: &nbsp;</label>
        <input
          type="text"
          name="firstName"
          onChange={(e) => {
            setCharacter({ ...character, firstName: e.target.value });
          }}
        />{" "}
        <br />
        <label htmlFor="lastName">Last Name: &nbsp;</label>
        <input
          type="text"
          name="lastName"
          onChange={(e) => {
            setCharacter({ ...character, lastName: e.target.value });
          }}
        />{" "}
        <br />
        <label htmlFor="creator">Creator: &nbsp;</label>
        <input
          type="text"
          name="creator"
          onChange={(e) => {
            setCharacter({ ...character, creator: e.target.value });
          }}
        />{" "}
        <br />
        <label htmlFor="race">Race: &nbsp;</label>
        <input
          type="text"
          name="race"
          onChange={(e) => {
            setCharacter({ ...character, race: e.target.value });
          }}
        />{" "}
        <br />
        <label htmlFor="origin">Origin: &nbsp;</label>
        <input
          type="text"
          name="origin"
          onChange={(e) => {
            setCharacter({ ...character, origin: e.target.value });
          }}
        />{" "}
        <br />
        <div>
          <label htmlFor="abilityName">Ability Name: &nbsp;</label>
          <input
            type="text"
            name="abilityName"
            onChange={(e) => {
              setAbility({ ...ability, name: e.target.value });
            }}
          />{" "}
          <br />
          <label htmlFor="abilityValue">Ability Value: &nbsp;</label>
          <input
            type="text"
            name="abilityValue"
            onChange={(e) => {
              setAbility({ ...ability, value: e.target.value });
            }}
          />{" "}
          <br />
          <button type="button" onClick={addAbility}>
            Add Ability
          </button>
        </div>
        <label htmlFor="strength">Strength: &nbsp;</label>
        <input
          type="Number"
          name="strength"
          onChange={(e) => {
            setCharacter({
              ...character,
              attributes: { ...character.attributes, strength: e.target.value },
            });
          }}
        />{" "}
        <br />
        <label htmlFor="endurance">Endurance: &nbsp;</label>
        <input
          type="Number"
          name="endurance"
          onChange={(e) => {
            setCharacter({
              ...character,
              attributes: {
                ...character.attributes,
                endurance: e.target.value,
              },
            });
          }}
        />{" "}
        <br />
        <label htmlFor="agility">Agility: &nbsp;</label>
        <input
          type="Number"
          name="agility"
          onChange={(e) => {
            setCharacter({
              ...character,
              attributes: { ...character.attributes, agility: e.target.value },
            });
          }}
        />{" "}
        <br />
        <label htmlFor="intelligence">Intelligence: &nbsp;</label>
        <input
          type="Number"
          name="intelligence"
          onChange={(e) => {
            setCharacter({
              ...character,
              attributes: {
                ...character.attributes,
                intelligence: e.target.value,
              },
            });
          }}
        />{" "}
        <br />
        <label htmlFor="magic">Magic: &nbsp;</label>
        <input
          type="Number"
          name="magic"
          onChange={(e) => {
            setCharacter({
              ...character,
              attributes: { ...character.attributes, magic: e.target.value },
            });
          }}
        />{" "}
        <br />
        <label htmlFor="speed">Speed: &nbsp;</label>
        <input
          type="Number"
          name="speed"
          onChange={(e) => {
            setCharacter({
              ...character,
              attributes: { ...character.attributes, speed: e.target.value },
            });
          }}
        />{" "}
        <br />
        <button type="submit">Submit</button>
      </form>
      <button
        type="button"
        onClick={(e) => {
          auth.logout(() => {
            props.history.push("/");
          });
          console.log("logout");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Form;
