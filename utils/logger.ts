import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
  transport: isDevelopment ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

// Helper function to create request logger with context
export const createRequestLogger = (req: any, res: any) => {
  const startTime = Date.now();
  
  return {
    logRequest: () => {
      logger.info({
        type: 'request',
        method: req.method,
        url: req.url,
        userAgent: req.headers['user-agent'],
        ip: req.headers['x-forwarded-for'] || req.connection?.remoteAddress,
        timestamp: new Date().toISOString(),
      }, 'Incoming request');
    },
    
    logResponse: (statusCode: number) => {
      const duration = Date.now() - startTime;
      logger.info({
        type: 'response',
        method: req.method,
        url: req.url,
        statusCode,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      }, 'Request completed');
    },
    
    logError: (error: Error, context?: Record<string, any>) => {
      logger.error({
        type: 'error',
        method: req.method,
        url: req.url,
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        context,
        timestamp: new Date().toISOString(),
      }, 'Request error');
    }
  };
};

// Helper function for general application logging
export const logInfo = (message: string, data?: Record<string, any>) => {
  logger.info(data || {}, message);
};

export const logError = (message: string, error?: Error, data?: Record<string, any>) => {
  logger.error({
    ...data,
    error: error ? {
      message: error.message,
      stack: error.stack,
      name: error.name,
    } : undefined,
  }, message);
};

export const logWarn = (message: string, data?: Record<string, any>) => {
  logger.warn(data || {}, message);
};
