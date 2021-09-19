import mongoose from 'mongoose'

import CharaterModel from '../models/character.model.js';

export const getCharacters = async (req, res) => {
    try {
        const characters = await CharaterModel.find();

        res.status(200).json(characters);
        
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
//-----------adding character-----------
// export const getCharacters = async (req, res) => {

//     const character = {
//         firstName: 'Chrome',
//         lastName: 'Iridel',
//         creator: 'Desturo',
//         race: 'Elf',
//         origin: 'Dark',
//         abilities: [{
//             name: 'Elemental Magic',
//             value: 78
//         },{
//             name: 'Sword Art',
//             value: 60
//         }],
//         attributes: {
//             strength: 13,
//             endurance: 10,
//             agility: 9,
//             intelligence: 10,
//             magic: 13,
//             speed: 9
//         }
//     };

//     const newCharacter = new CharaterModel(character);

//     try {
//         newCharacter.save((error) => {
//             if (error) return console.log(error);
//         });

//         res.status(201).json(newCharacter);
//     } catch (error) {
//         res.status(404).json({ message: error });
//     }
// }
