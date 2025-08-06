#!/usr/bin/env node

import inquirer from "inquirer";
import { join } from "path";
import config from "./defaultConfig";
import { upperName } from "./helpers";
import { existsSync, ensureDir, writeFile } from "fs-extra";
import { pathToFileURL } from "url";

// Загрузка пользовательского конфига
const loadUserConfig = async () => {
  const userConfigPath = join(process.cwd(), "cli-config.cjs");
  if (existsSync(userConfigPath)) {
    try {
      // Динамический импорт CommonJS конфига
      const userConfig = (await import(pathToFileURL(userConfigPath).href)).default || (await import(pathToFileURL(userConfigPath).href));
      return userConfig;
    } catch (e) {
      console.error("Ошибка при загрузке cli-config.cjs:", e);
      return {};
    }
  }
  return {};
};

let combinedConfig = config;

const createComponent = async () => {
  
  // Выбор типа компонента
  const { componentType } = await inquirer.prompt([
    {
      type: "list",
      name: "componentType",
      message: "Выберите тип компонента:",
      choices: combinedConfig.componentTypes.map((type) => type.name),
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
  const selectedType = combinedConfig.componentTypes.find(
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
  combinedConfig = Object.assign({}, config, userConfig);
  await createComponent();
})().catch((err) => {
  console.error(err);
});
