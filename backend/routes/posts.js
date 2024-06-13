//posts.js is a route file that contains all the routes related to posts.

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const { generateAccessToken } = require('../utils/auth');
const { hashPassword, verifyPassword } = require('../utils/passwordUtils');
const { pool } = require('../db');



// Registration endpoint
router.post('/register', async (req, res, next) => {
  try {
      const { username, email, password, secretKey } = req.body;

      // Check if the provided secret key matches the one stored in the environment
      if (secretKey !== process.env.REGISTRATION_SECRET) {
        return res.status(403).json({ message: "Unauthorized: Incorrect secret key" });
      }

      // Existing user check
      const existingUserQuery = await pool.query(
        'SELECT * FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUserQuery.rows.length > 0) {
        return res.status(409).json({ message: "Username or email already exists" });
      }

      // Hash the password and create the new admin user
      const hashedPassword = await hashPassword(password);
      const newUserQuery = await pool.query(
        'INSERT INTO users (username, email, password, is_admin) VALUES ($1, $2, $3, true)',
        [username, email, hashedPassword]
      );

      res.status(201).json({ message: 'Admin user registered successfully', user: newUserQuery.rows[0] });
  } catch (err) {
        next(err); 
      }
 
});


// Login endpoint
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userQuery = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userQuery.rows[0];
    if (await verifyPassword(password, user.password)) {
      
      const token = generateAccessToken({
        id: user.id,
        is_admin: user.is_admin 
      });
      res.json({ accessToken: token, message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Password is incorrect' });
    }
  } catch (err) {
    next(err);
  }
});


// The POST /api endpoint creates a new blog post in the database. The endpoint requires authentication and only allows admin users to create posts. The endpoint expects a JSON payload with the title and content of the post. 

router.post('/api/', authenticateToken, (req, res, next) => {
  //console.log("Reached API endpoint, user:", req.user);

  if (!req.user || !req.user.is_admin) {
      return res.status(403).json({ message: "Unauthorized: You do not have permission to create posts" });
  }
  next();
}, async (req, res) => {
 const { title, content } = req.body;
    const author_id = req.user.id; 
  try {
      const newPost = await pool.query(
          'INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
          [title, content, req.user.id] 
      );
      res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error("Error during post creation:", err);
      res.status(500).send("Server error");
  }
});


//The GET /api endpoint fetches all blog posts from the database without authentication and returns them as a JSON response.
router.get('/api/', async (req, res) => {
  try {
      const allPosts = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
      res.json(allPosts.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
});

//End point to fetch a single post by ID
router.get('/api/:id', async (req, res) => {
  
  try {
      const { id } = req.params;
      const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
      if (post.rows.length === 0) {
          return res.status(404).send('Post not found');
      }
      res.json(post.rows[0]);
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
  }
}); 




module.exports = router;
