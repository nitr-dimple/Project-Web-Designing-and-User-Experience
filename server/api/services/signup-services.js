import model from './../models/signup.js';

export const save = ({ name, email, password }) => {
    
    const user = new model({ name, email, password });
    return user.save(); 
}

export const update = (updatedContact) => {
    
    
    const user = model.findByIdAndUpdate(updatedContact.id, updatedContact,{new: true}).exec();
    return user;
}