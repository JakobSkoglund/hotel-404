import * as winston from 'winston';
import * as path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as fs from 'fs';

// Get the directory name
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Define log directory
const logDir = path.join(__dirname, 'logs');

// Ensure the directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a rotating file transport
const fileTransport = new DailyRotateFile({
  filename: path.join(logDir, 'app-%DATE%.log'), // Creates logs like app-2025-02-07.log
  datePattern: 'YYYY-MM-DD', // Rotates logs daily
  maxSize: '10m', // Optional: max size per file (e.g., 10MB)
  maxFiles: '3d', // Keeps logs for 3 days, then deletes older ones
  zippedArchive: true, // Compress old logs to save space
});

// Create the Winston logger
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    fileTransport, // Logs to rotating files only
  ],
});

export { logger };
