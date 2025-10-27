import { ConsoleLoggerOptions } from '@nestjs/common';

const consoleLoggerConfig: ConsoleLoggerOptions = {
  colors: true,
  timestamp: true,
  context: 'FinwiseApp',
  logLevels: ['log', 'warn', 'error', 'debug'],
};

export default consoleLoggerConfig;
