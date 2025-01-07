import { join } from 'path';
import { createDir, createFile, getConfig, getRootPath } from '../../utils';
import { defaultTemplate } from '../../variable';
import { existsSync } from 'fs';
import { FileType, FileTypesArray } from '../../types/FileType/FileType';

export type CreateProps = {
  filePath: string;
  fileType: string;
};

const fileTypesArray: FileTypesArray = ['rc', 'component', 'c', 'hook'];

export function create(props: CreateProps) {
  const sepReg = /\/|\\/;
  const config = getConfig();
  const { filePath, fileType } = props;
  const pathArray = filePath.split(sepReg);
  pathArray[pathArray.length - 1] =
    pathArray[pathArray.length - 1].charAt(0).toLocaleUpperCase() +
    pathArray[pathArray.length - 1].slice(1);
  if (fileType === 'hook') {
    pathArray[pathArray.length - 1] = `use${pathArray[pathArray.length - 1]}`;
  }
  const fileName = pathArray[pathArray.length - 1];

  if (!fileTypesArray.includes(fileType as FileType)) {
    console.log('Неверно введен тип создаваемого элемента');
    return false;
  }

  const type = fileType as FileType;

  if (fileName) {
    const rootPath = getRootPath();
    let intermediatePath = rootPath;

    const sourcePath = join(rootPath, config.creatingDir, ...pathArray);

    if (existsSync(sourcePath)) {
      console.log(
        'Невозможно создать элемент, данная директория уже существует'
      );
      return false;
    }

    const creatingPathArray = [
      ...config.creatingDir.split(sepReg),
      ...pathArray,
    ];

    creatingPathArray.forEach(el => {
      const path = join(intermediatePath, el);
      createDir(path);

      intermediatePath = path;
    });

    if (type === 'c' || type === 'component' || type === 'rc') {
      defaultTemplate.components(fileName, config).forEach(file => {
        createFile(join(sourcePath, file.fileName), file.template);
      });

      console.log('Компонент успешно создан');
      return fileName;
    }

    if (type === 'hook') {
      defaultTemplate.hook(fileName, config).forEach(file => {
        createFile(join(sourcePath, file.fileName), file.template);
      });

      console.log('Хук успешно создан');
      return fileName;
    }

    return false;
  }
  return false;
}
