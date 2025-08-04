const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { rateLimiterAndLogger } = require('./middleware/rateLimiterAndLogger');

const appRoutes = require('./routes/appRoutes');

// apply the rate limiter and logger middleware
app.use(rateLimiterAndLogger);

// using the routes defined in appRoutes
app.use('/', appRoutes); 

// server start
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});