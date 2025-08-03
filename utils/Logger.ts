import path from 'path';
import { fileURLToPath } from 'url';
import { DateTime } from 'luxon';
import winston from 'winston';

// Extend the winston.Logger interface
declare module 'winston' {
  interface Logger {
    table: (title: string, dataObject: Record<string, any>) => void;
  }
}
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const currentDir = __dirname;

// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, '..');

// Change to 'logging' folder
const loggingDir = path.resolve(srcDir, 'logs');

// Get Playwright worker index from environment variable
const workerId = process.env.TEST_WORKER_INDEX || 'main';

// Function to format log entries with timestamp, timezone, and worker ID
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [Worker ${workerId}] [${level}]: ${message}`;
});

// Set the desired timezone
const timeZone = "Asia/Kolkata"; // For India
const dateTime = DateTime.now().setZone(timeZone);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => dateTime.toFormat('yyyy-MM-dd HH:mm:ss ZZZZ'),
    }),
    customFormat,
  ),
  transports: [
    // Console Transport with Colorization for all levels
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(), // Colorize for all console logs
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [Worker ${workerId}] [${level}]: ${message}`;
        }),
      ),
    }),
    // Info File Transport
    new winston.transports.File({
      filename: path.join(loggingDir, 'test_run.log'),
      maxFiles: 5, // Number of log files to retain
      maxsize: 300 * 1024, // 10 * 1024 ==10 KB, specify the size in bytes
      level: 'info',
    }),
    // Error File Transport
    new winston.transports.File({
      filename: path.join(loggingDir, 'test_error.log'),
      maxFiles: 5, // Number of log files to retain
      maxsize: 10 * 1024, // 10 KB, specify the size in bytes
      level: 'error',
    }),
  ],
});

export default logger;