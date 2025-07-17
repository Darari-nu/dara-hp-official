import fs from 'fs-extra';
import path from 'path';

export interface FileManagerConfig {
  baseDirectory: string;
  dateFormat?: 'YYYY-MM-DD' | 'YYYYMMDD' | 'custom';
  fileNaming?: 'date_title' | 'title_only' | 'custom';
  customDateFormat?: string;
  customNamingFunction?: (title: string, date: Date) => string;
}

export interface SaveResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

export class UniversalFileManager {
  private config: FileManagerConfig;

  constructor(config: FileManagerConfig) {
    this.config = {
      dateFormat: 'YYYY-MM-DD',
      fileNaming: 'date_title',
      ...config
    };
  }

  async createDirectoryStructure(): Promise<void> {
    try {
      await fs.ensureDir(this.config.baseDirectory);
      
      // 日付別フォルダ作成
      const dateFolder = this.getDateFolder();
      const fullPath = path.join(this.config.baseDirectory, dateFolder);
      await fs.ensureDir(fullPath);
    } catch (error) {
      throw new Error(`Failed to create directory structure: ${error}`);
    }
  }

  async saveFile(
    data: Buffer, 
    title: string, 
    extension: string = '.png'
  ): Promise<SaveResult> {
    try {
      await this.createDirectoryStructure();
      
      const dateFolder = this.getDateFolder();
      const fileName = this.generateFileName(title, extension);
      const fullPath = path.join(this.config.baseDirectory, dateFolder, fileName);

      await fs.writeFile(fullPath, data);

      return {
        success: true,
        filePath: fullPath
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async saveTextFile(
    content: string,
    title: string,
    extension: string = '.txt'
  ): Promise<SaveResult> {
    try {
      await this.createDirectoryStructure();
      
      const dateFolder = this.getDateFolder();
      const fileName = this.generateFileName(title, extension);
      const fullPath = path.join(this.config.baseDirectory, dateFolder, fileName);

      await fs.writeFile(fullPath, content, 'utf-8');

      return {
        success: true,
        filePath: fullPath
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async listFiles(dateFolder?: string): Promise<string[]> {
    try {
      const targetFolder = dateFolder || this.getDateFolder();
      const fullPath = path.join(this.config.baseDirectory, targetFolder);
      
      if (!(await fs.pathExists(fullPath))) {
        return [];
      }

      const files = await fs.readdir(fullPath);
      return files.filter(file => !file.startsWith('.'));
    } catch (error) {
      console.warn(`Failed to list files: ${error}`);
      return [];
    }
  }

  async deleteFile(filePath: string): Promise<boolean> {
    try {
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.warn(`Failed to delete file: ${error}`);
      return false;
    }
  }

  async getFileInfo(filePath: string): Promise<{
    exists: boolean;
    size?: number;
    created?: Date;
    modified?: Date;
  }> {
    try {
      if (!(await fs.pathExists(filePath))) {
        return { exists: false };
      }

      const stats = await fs.stat(filePath);
      return {
        exists: true,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      };
    } catch (error) {
      return { exists: false };
    }
  }

  private getDateFolder(): string {
    const now = new Date();
    
    switch (this.config.dateFormat) {
      case 'YYYY-MM-DD':
        return now.toISOString().split('T')[0];
      case 'YYYYMMDD':
        return now.toISOString().split('T')[0].replace(/-/g, '');
      case 'custom':
        if (this.config.customDateFormat) {
          return this.formatDate(now, this.config.customDateFormat);
        }
        return now.toISOString().split('T')[0];
      default:
        return now.toISOString().split('T')[0];
    }
  }

  private generateFileName(title: string, extension: string): string {
    const now = new Date();
    const sanitizedTitle = this.sanitizeFileName(title);
    
    switch (this.config.fileNaming) {
      case 'date_title':
        const datePrefix = this.getDateFolder().replace(/-/g, '');
        return `${datePrefix}_${sanitizedTitle}${extension}`;
      case 'title_only':
        return `${sanitizedTitle}${extension}`;
      case 'custom':
        if (this.config.customNamingFunction) {
          return this.config.customNamingFunction(sanitizedTitle, now);
        }
        return `${sanitizedTitle}${extension}`;
      default:
        const defaultDatePrefix = this.getDateFolder().replace(/-/g, '');
        return `${defaultDatePrefix}_${sanitizedTitle}${extension}`;
    }
  }

  private sanitizeFileName(fileName: string): string {
    // ファイル名に使用できない文字を除去・置換
    return fileName
      .replace(/[<>:"/\\|?*]/g, '_')
      .replace(/\s+/g, '_')
      .substring(0, 100) // 長すぎるファイル名を切り詰め
      .replace(/^\.+|\.+$/g, ''); // 先頭・末尾のドットを除去
  }

  private formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  }

  // ディレクトリ構造の取得
  async getDirectoryStructure(): Promise<{
    baseDir: string;
    folders: string[];
    totalFiles: number;
  }> {
    try {
      const folders = await fs.readdir(this.config.baseDirectory);
      const validFolders = [];
      let totalFiles = 0;

      for (const folder of folders) {
        const folderPath = path.join(this.config.baseDirectory, folder);
        const stat = await fs.stat(folderPath);
        
        if (stat.isDirectory()) {
          validFolders.push(folder);
          const files = await fs.readdir(folderPath);
          totalFiles += files.length;
        }
      }

      return {
        baseDir: this.config.baseDirectory,
        folders: validFolders.sort(),
        totalFiles
      };
    } catch (error) {
      return {
        baseDir: this.config.baseDirectory,
        folders: [],
        totalFiles: 0
      };
    }
  }
}