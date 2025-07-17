import fs from 'fs-extra';
import path from 'path';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export class Logger {
  private logFile: string;
  private logLevel: LogLevel;

  constructor(logFile: string = './logs/app.log', logLevel: LogLevel = LogLevel.INFO) {
    this.logFile = logFile;
    this.logLevel = logLevel;
    this.ensureLogDirectory();
  }

  private async ensureLogDirectory(): Promise<void> {
    const logDir = path.dirname(this.logFile);
    await fs.ensureDir(logDir);
  }

  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] [${level}] ${message}`;
    
    if (data) {
      return `${logEntry} ${JSON.stringify(data)}`;
    }
    
    return logEntry;
  }

  private async writeLog(level: LogLevel, levelName: string, message: string, data?: any): Promise<void> {
    if (level < this.logLevel) {
      return;
    }

    const formattedMessage = this.formatMessage(levelName, message, data);
    
    console.log(formattedMessage);
    
    try {
      await fs.appendFile(this.logFile, formattedMessage + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  async debug(message: string, data?: any): Promise<void> {
    await this.writeLog(LogLevel.DEBUG, 'DEBUG', message, data);
  }

  async info(message: string, data?: any): Promise<void> {
    await this.writeLog(LogLevel.INFO, 'INFO', message, data);
  }

  async warn(message: string, data?: any): Promise<void> {
    await this.writeLog(LogLevel.WARN, 'WARN', message, data);
  }

  async error(message: string, data?: any): Promise<void> {
    await this.writeLog(LogLevel.ERROR, 'ERROR', message, data);
  }

  async logGeneration(prompt: string, enhancedPrompt: string, result: any): Promise<void> {
    const logData = {
      timestamp: new Date().toISOString(),
      originalPrompt: prompt,
      enhancedPrompt: enhancedPrompt,
      success: result.success,
      imagePath: result.imagePath,
      error: result.error,
      cost: result.cost
    };

    await this.info('Image generation completed', logData);
  }

  async logError(error: Error, context?: string): Promise<void> {
    const errorData = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context: context,
      timestamp: new Date().toISOString()
    };

    await this.error('Application error occurred', errorData);
  }

  async rotateLogs(maxFiles: number = 10): Promise<void> {
    try {
      const logDir = path.dirname(this.logFile);
      const logBaseName = path.basename(this.logFile, path.extname(this.logFile));
      const logExt = path.extname(this.logFile);

      const files = await fs.readdir(logDir);
      const logFiles = files
        .filter(file => file.startsWith(logBaseName))
        .sort()
        .reverse();

      if (logFiles.length >= maxFiles) {
        const filesToDelete = logFiles.slice(maxFiles - 1);
        for (const file of filesToDelete) {
          await fs.remove(path.join(logDir, file));
        }
      }

      if (await fs.pathExists(this.logFile)) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const rotatedFile = path.join(logDir, `${logBaseName}_${timestamp}${logExt}`);
        await fs.move(this.logFile, rotatedFile);
      }
    } catch (error) {
      console.error('Failed to rotate logs:', error);
    }
  }
}