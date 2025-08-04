const { auditLogs } = require('../middleware/rateLimiterAndLogger');

// root endpoint '/'
const getRoot = (req, res) => {
    res.json({ message: "A request is made. " });
};

//  '/logs' endpoint
const getLogs = (req, res) => {
    res.json({ logs: auditLogs });
};

module.exports = {
    getRoot,
    getLogs
};