#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const config = require("./defaultConfig");
const { upperName } = require("./helpers");

const createComponent = async () => {
  // Выбор типа компонента
  const { componentType } = await inquirer.default.prompt([
    {
      type: "list",
      name: "componentType",
      message: "Выберите тип компонента:",
      choices: config.componentTypes.map((type) => type.name),
    },
  ]);

  // Ввод названия компонента
  const { inputPath } = await inquirer.default.prompt([
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
  const fullName = `${prefix}${componentName}`;
  const componentPath = path.join(
    process.cwd(),
    selectedType.path,
    ...filePath,
    componentType === "component" ? upperName(fullName) : fullName
  );

  // Создание директории
  await fs.ensureDir(componentPath);

  // Создание файлов
  selectedType.files(fullName).forEach(async (element) => {
    const fileName = element.fileName;
    const filePath = path.join(componentPath, fileName);
    const template = element.template;
    await fs.writeFile(filePath, template);
  });
  console.log(`Компонент ${fullName} успешно создан в ${componentPath}`);
};

createComponent().catch((err) => {
  console.error(err);
});
