//This file contains the middleware that will be used to authenticate the user using JWT token.



const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
          return res.status(403).send({ message: "Invalid token" });
      }
      //console.log("Decoded user from JWT:", user);
      req.user = user;
      next();
  });
};


module.exports = authenticateToken;
