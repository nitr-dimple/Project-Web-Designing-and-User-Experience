import model from './../models/signup.js';

export const save = (newUser) => {
    const user = new model(newUser);
    return user.save(); 
}