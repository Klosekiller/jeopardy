const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const gameRoutes = require('./src/routes/gameRoutes');
app.use('/api', gameRoutes);

// Serve the compiled HTML files from the 'dist' directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Example additional route
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'about.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
