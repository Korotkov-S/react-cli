#!/usr/bin/env node

import inquirer from "inquirer";
import { join } from "path";
import config from "./defaultConfig";
import { upperName } from "./helpers";
import { existsSync, ensureDir, writeFile, readFile  } from "fs-extra";


// Загрузка пользовательского конфига
const loadUserConfig = async () => {
  const userConfigPath = join(process.cwd(), "cli-config.cjs");
  if (existsSync(userConfigPath)) {
    try {
      const code = await readFile(userConfigPath, "utf-8");
      const module = { exports: {} };
      // eslint-disable-next-line no-eval
      eval(code);
      return module.exports;
    } catch (e) {
      return {};
    }
  }
  return {};
};



const createComponent = async (config) => {
  
  // Выбор типа компонента
  const { componentType } = await inquirer.prompt([
    {
      type: "list",
      name: "componentType",
      message: "Выберите тип компонента:",
      choices: config.componentTypes.map((type) => type.name),
    },
  ]);

  // Ввод названия компонента
  const { inputPath } = await inquirer.prompt([
    {
      type: "input",
      name: "inputPath",
      message: "Введите название компонента:",
    },
  ]);

  //Формирование массива пути
  const sepReg = /\/|\\/;
  const pathArray = inputPath.split(sepReg);

  // Получаем имя компонента
  const componentName = pathArray[pathArray.length - 1];

  // Получаем путь к компоненты
  const filePath = pathArray.slice(0, -1);

  // Получение информации о выбранном типе
  const selectedType = config.componentTypes.find(
    (type) => type.name === componentType
  );

  const prefix = selectedType.prefix;
  const suffix = selectedType.suffix;

  const fullName = `${prefix}${upperName(componentName)}${suffix}`;
  const componentPath = join(
    process.cwd(),
    selectedType.path,
    ...filePath,
    fullName
  );

  // Создание директории
  await ensureDir(componentPath);

  // Создание файлов
  selectedType.files(fullName).forEach(async (element) => {
    const fileName = element.fileName;
    const filePath = join(componentPath, fileName);
    const template = element.template;
    await writeFile(filePath, template);
  });
  console.log(`Компонент ${fullName} успешно создан в ${componentPath}`);
};

(async () => {
  const userConfig = await loadUserConfig();
  const combinedConfig = { ...config, ...userConfig };
  combinedConfig.componentTypes = [
    ...userConfig.componentTypes,
    ...config.componentTypes.filter(
      (baseType) =>
        !userConfig.componentTypes.some(
          (userType) => userType.name === baseType.name
        )
    ),
  ];
  await createComponent(combinedConfig);
})().catch((err) => {
  console.error(err);
});
