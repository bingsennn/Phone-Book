import { createLogger, format, transports } from "winston";

// Define the log format
const logFormat = format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return JSON.stringify({timestamp, level, message});
    })
);
  
// Create a logger with console and file transports
export const logger = createLogger({
format: logFormat,
transports: [
    new transports.Console()
],
});