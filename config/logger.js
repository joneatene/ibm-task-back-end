const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  transports: [
    new transports.File({
      level: "info",
      filename: "articlesAndSearches.log",
      options: { useUnifiedTopology: true },
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.json()
      ),
    }),
  ],
});

module.exports = logger;
