import winston from "winston";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json(),
    ),
    transports: [
        new winston.transports.Console(),
    ],
});