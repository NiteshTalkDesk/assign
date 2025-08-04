
const requestCounts = {};
const auditLogs = [];

const RATE_LIMIT_PER_MINUTE = 5;
const TIME_WINDOW_MILLISECONDS = 60 * 1000;

const rateLimiterAndLogger = (req, res, next) => {
    const clientIp = req.ip;
    const currentTime = Date.now();

    // Initialize or clean up the request count for this IP.
    if (!requestCounts[clientIp]) {
        requestCounts[clientIp] = [];
    }
    requestCounts[clientIp] = requestCounts[clientIp].filter(
        timestamp => currentTime - timestamp <= TIME_WINDOW_MILLISECONDS
    );

    let outcome;
    if (requestCounts[clientIp].length >= RATE_LIMIT_PER_MINUTE) {
        outcome = "blocked";

        const logEntry = {
            timestamp: new Date().toISOString(),
            ip: clientIp,
            path: req.originalUrl,
            method: req.method,
            status: 429,
            outcome: outcome,
        };
        auditLogs.push(logEntry);

        return res.status(429).json({
            detail: "Rate limit exceeded...."
        });
    }

    requestCounts[clientIp].push(currentTime);
    outcome = "allowed";

    res.on('finish', () => {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ip: clientIp,
            path: req.originalUrl,
            method: req.method,
            status: res.statusCode,
            outcome: outcome,
        };
        auditLogs.push(logEntry);
    });

    next();
};

module.exports = {
    rateLimiterAndLogger,
    auditLogs
};
