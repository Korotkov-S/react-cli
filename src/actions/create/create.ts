import { join } from 'path';
import { createDir, createFile, getConfig, getRootPath } from '../../utils';
import { defaultTemplate } from '../../variable';

export type CreateProps = {
  filePath: string;
  fileType: string;
};

export function create(props: CreateProps) {
  const sepReg = /\/|\\/;
  const config = getConfig();
  const { filePath } = props;
  const pathArray = filePath.split(sepReg);
  const fileName = pathArray.at(-1);

  if (fileName) {
    const sourcePath = join(getRootPath(), config.creatingDir, ...pathArray);

    let intermediatePath = getRootPath();

    const creatingPathArray = [
      ...config.creatingDir.split(sepReg),
      ...pathArray,
    ];

    creatingPathArray.forEach(el => {
      const path = join(intermediatePath, el);
      createDir(path);

      intermediatePath = path;
    });

    defaultTemplate.components(fileName, config).forEach(file => {
      createFile(join(sourcePath, file.fileName), file.template);
    });
  }
}
