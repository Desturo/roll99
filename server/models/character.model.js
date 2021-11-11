import mongoose from 'mongoose';

const AbilitySchema = mongoose.Schema({
    name: String,
    value: Number
});

const characterSchema = mongoose.Schema({
    campaign: String,
    firstName: String,
    lastName: String,
    creator: String,
    race: String,
    origin: String,
    abilities: [AbilitySchema],
    attributes: { type: {
        strength: Number,
        endurance: Number,
        agility: Number,
        intelligence: Number,
        magic: Number,
        speed: Number
    }}
});

const CharaterModel = mongoose.model('CharacterModel', characterSchema);

export default CharaterModel;