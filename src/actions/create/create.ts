import { join } from 'path';
import { createDir, createFile, getConfig, getRootPath } from '../../utils';
import { defaultTemplate } from '../../variable';
import { existsSync } from 'fs';
import { FileType, FileTypesArray } from '../../types/FileType/FileType';

export type CreateProps = {
  filePath: string;
  fileType: string;
};

const fileTypesArray: FileTypesArray = ['rc', 'component', 'c'];

export function create(props: CreateProps) {
  const sepReg = /\/|\\/;
  const config = getConfig();
  const { filePath, fileType } = props;
  const pathArray = filePath.split(sepReg);
  const fileName = pathArray.at(-1);

  if (!fileTypesArray.includes(fileType as FileType)) {
    console.log('Неверно введен тип создаваемого элемента');
    return;
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
      return;
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
      return;
    }
  }
}
