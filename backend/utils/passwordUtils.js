// This file contains the utility functions for hashing and verifying passwords using bcrypt.

const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};


const verifyPassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

module.exports = { hashPassword, verifyPassword };
