const CharaterModel = require("../models/character.model.js");
const UserModel = require("../models/user.model.js");

const getCharacters = async (req, res) => {
  //req.user object availiable because of middleware

  try {
    const characters = await CharaterModel.find();

    res.status(200).json(characters);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getUsersCharacters = (req, res) => {
  const userID = req.body.id;

  CharaterModel.find({creator: userID}, (err, docs) => {
    if(!err) {
      res.status(200).send(docs);
    } else {
      res.sendStatus(500);
      console.log(err);
    }
  })
}

const createCharacter = async (req, res) => {
  let character = req.body;

  const newCharacter = new CharaterModel(character);

  try {
    newCharacter.save((error) => {
      if (error) return console.log(error);
    });

    UserModel.findById(character.creator, (err, doc) => {
      if(err) {
        console.log(err);
      }else {
        doc.characters.push(newCharacter.id);
        doc.save((err) => {
          err && console.log(err);
        })
      }
      
    })

    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

exports.createCharacter = createCharacter;
exports.getUsersCharacters = getUsersCharacters;
exports.getCharacters = getCharacters;