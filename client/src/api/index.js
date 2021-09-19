import axios from 'axios';

const url = 'http://localhost:5000/characters';

export const fetchCharacters = () => axios.get(url);
export const createCharacter = (newCharacter) => axios.post(url, newCharacter);
