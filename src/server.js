const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const users = require('./database/users.json');


const app = express();
const port = 3000;
const secretKey = 'your-secret-key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

function validarUsuario(username, password) {
  const usuarioValido = users.users.find(users => users.username === username && users.password === password);
  return usuarioValido !== undefined;
}

// Route handlers
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  /* // Check username and password against database or other authentication system
  if (username === 'admin' && password === 'password') {
    console.log('credenciales correctas');
    // Generate token and send it back to client
    const token = jwt.sign({ username }, secretKey);
    res.json({ accessToken: token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  } */

  if (validarUsuario(username, password)) {
    const token = jwt.sign({ username }, secretKey);
    res.json({ accessToken: token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});