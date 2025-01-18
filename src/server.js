require('dotenv').config();
const express = require('express');
const { setupRoutes } = require('./routes');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Add CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.json());

// Add a basic root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Review Scraper API' });
});

// Setup routes
setupRoutes(app);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
    logger.info(`Health check: http://localhost:${PORT}/health`);
    logger.info(`Reviews endpoint: http://localhost:${PORT}/api/reviews?page=<url>`);
}); 