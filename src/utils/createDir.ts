import { existsSync, mkdirSync } from 'fs';
/**
 *
 * @param path
 * @description Создает директорию по переданному пути
 */
export function createDir(path: string) {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
}
