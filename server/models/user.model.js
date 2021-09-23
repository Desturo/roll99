import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
});

const UserModel = mongoose.model('UserModel', userSchema);

export default UserModel;