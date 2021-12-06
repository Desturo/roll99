import axios from "axios";

const charactersUrl = "http://185.228.139.62/api/characters";
const usersUrl = "http://185.228.139.62/api/auth";
const campaignsUrl = "http://185.228.139.62/api/campaigns";

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

export const getUserCampaigns = () =>
  axios.get(campaignsUrl, { withCredentials: true });

export const checkToken = () =>
  axios.get(usersUrl + "/checkToken", { withCredentials: true });

export const createCampaign = (campaignName) =>
  axios.post(campaignsUrl, campaignName);

//the input object needs to contain the player name and the campaign they want to join. In the backend the player will either get added, rejected due to an error or rejcted because hes already part of the campaign
export const addPlayerToCampaign = (inputObject) => {
  axios.post(campaignsUrl + "/players", inputObject);
};
