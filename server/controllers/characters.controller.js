import CharaterModel from '../models/character.model.js';

export const getCharacters = async (req, res) => {

    //req.user object availiable because of middleware

    try {
        const characters = await CharaterModel.find();

        res.status(200).json(characters);
        
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createCharacter = async (req, res) => {

    const character = req.body;

    const newCharacter = new CharaterModel(character);

    try {
        newCharacter.save((error) => {
            if (error) return console.log(error);
        });

        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
