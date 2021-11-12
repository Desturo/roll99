import axios from "axios";

const charactersUrl = "http://localhost:5000/characters";
const usersUrl = "http://localhost:5000/auth";
const campaignsUrl = "http://localhost:5000/campaigns";

//fetch Characters belonging the user specified by id
export const fetchCharacters = (id) => axios.post(charactersUrl + "/get", id);

export const createCharacter = (newCharacter) =>
  axios.post(charactersUrl, newCharacter);

export const fetchUsers = () => axios.get(usersUrl);
export const createUser = (newUser) =>
  axios.post(usersUrl + "/create", newUser);

//getting back a refreshtoken as cookie and a JSON Object with the loginValid key. Needs an Object with username and password values
export const loginUser = (userToCheck) =>
  axios.post(usersUrl + "/login", userToCheck);

export const checkToken = () =>
  axios.get(usersUrl + "/checkToken", { withCredentials: true });

export const createCampaign = (campaignName) =>
  axios.post(campaignsUrl, campaignName);

//the input object needs to contain the player name and the campaign they want to join. In the backend the player will either get added, rejected due to an error or rejcted because hes already part of the campaign
export const addPlayerToCampaign = (inputObject) => {
  axios.post(campaignsUrl + "/players", inputObject);
};
