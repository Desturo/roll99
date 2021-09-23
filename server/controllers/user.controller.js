import mongoose from 'mongoose'

import UserModel from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();

        res.status(200).json(users);
        
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

export const createUser = async (req, res) => {

    const user = req.body;

     if(UserModel.exists({ username: user.username }))
     {
         console.log('user doesnt exist');
        const newUser = new UserModel(user);

        try {
            newUser.save((error) => {
                if (error) return console.log(error);
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.log('err');
            //res.status(404).json({ message: error });
        }
     } else {
         res.status(400).json({ message: 'username taken' });
     }
    
}
