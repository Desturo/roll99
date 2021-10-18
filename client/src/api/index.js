import axios from 'axios';

const charactersUrl = 'http://localhost:5000/characters';
const usersUrl = 'http://localhost:5000/users';

export const fetchCharacters = () => axios.get(charactersUrl);
export const createCharacter = (newCharacter) => axios.post(charactersUrl, newCharacter);

export const fetchUsers = () => axios.get(usersUrl);
export const createUser = (newUser) => axios.post(usersUrl, newUser);

//getting back a refreshtoken as cookie and a JSON Object with the loginValid key. Needs an Object with username and password values
export const loginUser = (userToCheck) => axios.post(usersUrl + '/login', userToCheck);
