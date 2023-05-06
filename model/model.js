import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: Number,
    city: String
});

const User = mongoose.model('User', userSchema);

export { User }