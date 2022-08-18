import User from './../models/user.js';

/**
 * Function to save new user
 * @param  user 
 * @returns newly created user
 */
export const save = (user) => {
    const userData = new User(user);
    return userData.save(); 
}

/**
 * Function to list all the user
 * @param query 
 * @returns list of all the user
 */
 export const search = (query) => {
    const params = {...query};
    return User.find(params).exec();
}