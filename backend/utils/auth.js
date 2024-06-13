// This file contains Auth helper functions 

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  
  //console.log("User data before token generation:", user);
  return jwt.sign({
      id: user.id,
      is_admin: user.is_admin 
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
};




module.exports = { generateAccessToken };
