import { ConsoleLoggerOptions } from '@nestjs/common';

const _consoleLoggerConfig: ConsoleLoggerOptions = {
  colors: true,
  timestamp: true,
  context: 'FinwiseApp',
};

export const consoleLoggerConfig = Object.freeze(_consoleLoggerConfig);
