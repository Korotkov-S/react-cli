#!/usr/bin/env node

import inquirer from "inquirer";
import { join } from "path";
import { pathToFileURL } from "url";
import { createRequire } from "module";
import config from "./defaultConfig";
import { upperName } from "./helpers";
import { existsSync, ensureDir, writeFile, readFile  } from "fs-extra";


// Загрузка пользовательского конфига
const loadUserConfig = async () => {
  const configFiles = [
    "cli-config.cjs",
    "cli-config.mjs", 
    "cli-config.js",
    "cli-config.ts"
  ];
  
  for (const configFile of configFiles) {
    const userConfigPath = join(process.cwd(), configFile);
    if (existsSync(userConfigPath)) {
      try {
        if (configFile.endsWith(".cjs") || configFile.endsWith(".js")) {
          // Для CommonJS файлов используем require
          const require = createRequire(import.meta.url);
          const userConfig = require(userConfigPath);
          return userConfig.default || userConfig;
        } else {
          // Для ESM файлов используем динамический импорт
          const configUrl = pathToFileURL(userConfigPath).href;
          const userConfig = await import(configUrl);
          return userConfig.default || userConfig;
        }
      } catch (e) {
        console.warn(`Ошибка загрузки конфига ${configFile}:`, e.message);
        continue;
      }
    }
  }
  
  return { componentTypes: [] };
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
  const filePromises = selectedType.files(fullName).map(async (element) => {
    const fileName = element.fileName;
    const filePath = join(componentPath, fileName);
    const template = element.template;
    await writeFile(filePath, template);
  });
  
  await Promise.all(filePromises);
  console.log(`Компонент ${fullName} успешно создан в ${componentPath}`);
};

(async () => {
  const userConfig = await loadUserConfig();
  const combinedConfig = { ...config, ...userConfig };
  
  // Безопасный мерж componentTypes с защитой от undefined
  const userTypes = userConfig.componentTypes || [];
  const baseTypes = config.componentTypes || [];
  
  combinedConfig.componentTypes = [
    ...userTypes,
    ...baseTypes.filter(
      (baseType) =>
        !userTypes.some(
          (userType) => userType.name === baseType.name
        )
    ),
  ];
  
  await createComponent(combinedConfig);
})().catch((err) => {
  console.error(err);
});
