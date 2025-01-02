import { resolve } from 'node:path';
import { create } from '../create/create';
import { appendFile } from 'node:fs';
import { getConfig, getRootPath } from '../../utils';

export function generate(type: string, name: string) {
  const config = getConfig()

  if (type === 'rc' || type === 'c' || type === 'component') {
    const isCreating = create({
      fileType: 'c',
      filePath: 'components/' + name,
    });

    if (!isCreating) {
      console.log('Генерация прервана');
      return;
    }

    const path = resolve(getRootPath(), 'src', 'components', `index.${config.useTypescript? 'ts':'js'}`);
    const data = `export * from "./${name}";
`;

    appendFile(path, data, err => {
      if (err) throw err;
      console.log('Файл реэкспорта успешно обновлен');
    });
  }
}
