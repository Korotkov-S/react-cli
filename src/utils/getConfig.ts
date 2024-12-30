import { join } from 'path';

import { statSync, readFileSync, existsSync } from 'fs';
import { Config, defaultConfig } from '../variable';
import { getRootPath } from './getRootPath';

export function getConfig() {
  const patch = join(getRootPath(), 'cli.config.json');

  if (!existsSync(patch)) {
    return defaultConfig;
  }

  try {
    const stats = statSync(patch);

    if (stats.isFile()) {
      const data = readFileSync(patch, 'utf8');

      return Object.assign(defaultConfig, JSON.parse(data) as Partial<Config>);
    } else {
      return defaultConfig;
    }
  } catch (error) {
    return defaultConfig;
  }
}
