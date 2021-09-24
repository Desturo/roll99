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

     if(!await UserModel.exists({ username: user.username }))
     {
        const newUser = new UserModel(user);

        try {
            newUser.save((error) => {
                if (error) return console.log(error);
            });

            res.status(201).json(newUser);
        } catch (error) {
            res.status(404).json({ message: error });
        }
     } else {
         res.status(409).json({ type: 'username taken' });
     }
    
}

export const getUserCheck = async (req, res) => {
    const user = req.body

    if(await UserModel.exists({ 
        username: user.username,
        password: user.password
    })) {
        res.status(200).json({ loginValid: true })
    } else {
        res.status(200).json({ loginValid: false })
    }
}
