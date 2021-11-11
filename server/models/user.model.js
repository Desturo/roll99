import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    characters: Array,
    campaigns: Array
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;