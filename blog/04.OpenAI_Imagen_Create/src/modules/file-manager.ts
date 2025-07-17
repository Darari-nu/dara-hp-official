import fs from 'fs-extra';
import path from 'path';

export class FileManager {
  private baseDir: string;

  constructor(baseDir: string = './images') {
    this.baseDir = baseDir;
  }

  async saveImage(imageBuffer: Buffer, title: string): Promise<string> {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    const timeStr = today.toTimeString().split(' ')[0].replace(/:/g, '');
    
    const dateDir = path.join(this.baseDir, dateStr);
    await fs.ensureDir(dateDir);

    const sanitizedTitle = this.sanitizeFilename(title);
    const filename = `${dateStr}_${sanitizedTitle}.png`;
    const filepath = path.join(dateDir, filename);

    let finalPath = filepath;
    let counter = 1;
    
    while (await fs.pathExists(finalPath)) {
      const ext = path.extname(filename);
      const nameWithoutExt = path.basename(filename, ext);
      finalPath = path.join(dateDir, `${nameWithoutExt}_${counter}${ext}`);
      counter++;
    }

    await fs.writeFile(finalPath, imageBuffer);
    return finalPath;
  }

  private sanitizeFilename(filename: string): string {
    return filename
      .replace(/[<>:"/\\|?*]/g, '_')
      .replace(/\s+/g, '_')
      .replace(/[^\w\-_]/g, '')
      .substring(0, 50);
  }

  async createDirectoryStructure(): Promise<void> {
    await fs.ensureDir(this.baseDir);
    await fs.ensureDir(path.join(this.baseDir, 'logs'));
  }

  async getImageCount(date?: string): Promise<number> {
    const targetDate = date || new Date().toISOString().split('T')[0].replace(/-/g, '');
    const dateDir = path.join(this.baseDir, targetDate);
    
    if (!(await fs.pathExists(dateDir))) {
      return 0;
    }

    const files = await fs.readdir(dateDir);
    return files.filter((file: string) => file.endsWith('.png')).length;
  }

  async getDiskUsage(): Promise<{ used: number; available: number }> {
    try {
      const stats = await fs.stat(this.baseDir);
      return {
        used: stats.size,
        available: 1000000000
      };
    } catch (error) {
      return {
        used: 0,
        available: 1000000000
      };
    }
  }

  async cleanupOldFiles(daysToKeep: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    if (!(await fs.pathExists(this.baseDir))) {
      return;
    }

    const dirs = await fs.readdir(this.baseDir);
    
    for (const dir of dirs) {
      const dirPath = path.join(this.baseDir, dir);
      const stats = await fs.stat(dirPath);
      
      if (stats.isDirectory() && stats.mtime < cutoffDate) {
        await fs.remove(dirPath);
        console.log(`Cleaned up old directory: ${dir}`);
      }
    }
  }
}