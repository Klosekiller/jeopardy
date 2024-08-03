const path = require('path');
const fs = require('fs').promises; // Use the promise-based API

exports.getCategories = async (req, res) => {
  const filePath = path.join(__dirname, '../../categories.json');
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const categories = JSON.parse(data);
    console.log('Categories data:', categories); // Debugging line
    res.json(categories);
  } catch (error) {
    console.error('Error reading or parsing categories file:', error);
    res.status(500).json({ error: 'Error reading or parsing categories file' }); // Send error as JSON
  }
};
