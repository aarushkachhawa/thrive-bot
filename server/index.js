require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Debug logging for environment
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://thrive-bot-production.up.railway.app',
    'https://thrive-bot-production.up.railway.app:8080',
    'https://thrive-bot-testing.up.railway.app',
    'https://thrive-bot-testing.up.railway.app:8080'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
  allowedHeaders: ['Content-Type', 'Accept']
}));

// Debug logging for build directory
const buildDir = path.join(__dirname, '../client/dist');
console.log('Build directory path:', buildDir);
console.log('Build directory exists:', fs.existsSync(buildDir));
if (fs.existsSync(buildDir)) {
  console.log('Build directory contents:', fs.readdirSync(buildDir));
  const assetsDir = path.join(buildDir, 'assets');
  if (fs.existsSync(assetsDir)) {
    console.log('Assets directory contents:', fs.readdirSync(assetsDir));
  }
}

// Request logging with more details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  const buildDir = path.join(__dirname, '../client/dist');
  const assetsDir = path.join(buildDir, 'assets');
  const indexPath = path.join(buildDir, 'index.html');
  
  let indexContent = '';
  try {
    indexContent = fs.readFileSync(indexPath, 'utf8');
  } catch (err) {
    indexContent = `Error reading index.html: ${err.message}`;
  }

  let assetsContent = [];
  try {
    if (fs.existsSync(assetsDir)) {
      assetsContent = fs.readdirSync(assetsDir);
    }
  } catch (err) {
    assetsContent = [`Error reading assets: ${err.message}`];
  }

  res.json({ 
    message: 'Server is running',
    buildDir: buildDir,
    buildDirExists: fs.existsSync(buildDir),
    env: process.env.NODE_ENV,
    buildContents: fs.existsSync(buildDir) ? fs.readdirSync(buildDir) : [],
    assetsContents: assetsContent,
    indexHtml: indexContent
  });
});

// API routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Serve static files with cache control
app.use(express.static(buildDir, {
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    console.log('Serving static file:', filePath);
    // Force no caching for all files
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
}));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  console.log('Handling catch-all route for:', req.url);
  const indexPath = path.join(buildDir, 'index.html');
  console.log('Serving index.html from:', indexPath);
  console.log('File exists:', fs.existsSync(indexPath));
  res.sendFile(indexPath);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test server at: http://localhost:${PORT}/test`);
});
