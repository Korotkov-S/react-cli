import { resolve } from 'node:path';
import { create } from '../create/create';
import { appendFile } from 'node:fs';
import { getConfig, getRootPath } from '../../utils';

export function generate(type: string, name: string) {
  const config = getConfig();
  const rootPath = getRootPath();
  const indexFileName = `index.${config.useTypescript ? 'ts' : 'js'}`;

  if (type === 'rc' || type === 'c' || type === 'component') {
    const isCreating = create({
      fileType: 'c',
      filePath: 'components/' + name,
    });

    if (!isCreating) {
      console.log('Генерация прервана');
      return;
    }

    const path = resolve(rootPath, 'src', 'components', indexFileName);
    const data = `export * from "./${isCreating}";
`;

    appendFile(path, data, err => {
      if (err) throw err;
      console.log('Файл реэкспорта успешно обновлен');
    });
  }

  if (type === 'hook') {
    const isCreating = create({
      fileType: 'hook',
      filePath: 'hooks/' + name,
    });

    if (!isCreating) {
      console.log('Генерация прервана');
      return;
    }

    const path = resolve(rootPath, 'src', 'hooks', indexFileName);
    const data = `export * from "./${isCreating}";
`;
    appendFile(path, data, err => {
      if (err) throw err;
      console.log('Файл реэкспорта успешно обновлен');
    });
  }

  if (type === 'type') {
    const isCreating = create({
      filePath: 'types/' + name,
      fileType: type,
    });

    console.log(isCreating);
    if (!isCreating) {
      console.log('Генерация прервана');
      return;
    }

    const path = resolve(rootPath, 'src', 'types', indexFileName);
    const data = `export * from "./${isCreating}";
`;

    appendFile(path, data, err => {
      if (err) throw err;
      console.log('Файл реэкспорта успешно обновлен');
    });
  }
}
