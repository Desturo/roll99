import axios from 'axios';

const charactersUrl = 'http://localhost:5000/characters';
const usersUrl = 'http://localhost:5000/users';

export const fetchCharacters = () => axios.get(charactersUrl);
export const createCharacter = (newCharacter) => axios.post(charactersUrl, newCharacter);

export const fetchUsers = () => axios.get(usersUrl);
export const createUser = (newUser) => axios.post(usersUrl, newUser);
