import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serves the HTML file from the public folder
// Tell express to use the public folder for static assets
app.use(express.static(path.join(__dirname, '../public')));


// serving up the html file from the public folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});