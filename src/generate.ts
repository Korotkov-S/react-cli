import { Commands, DirSuffix, GenerateObject } from "./type";

import fs from "fs";
import path from "path";

/**
 *
 * @param {Commands} type тип генерируемого файла
 * @param {string} name имя генерируемого файла
 * @returns {void}
 */

export function generate(type: Commands, name: string): void {
  const srcPath = [__dirname, "..", "src"];

  if (!(type in generateObj)) {
    console.error("Невозможно сгенерировать");
    return;
  }

  const dirPatch = path.resolve(...srcPath, generateObj[type]);

  const lowerCaseStr = name;

  const componentName =
    lowerCaseStr.charAt(0).toUpperCase() + lowerCaseStr.slice(1);

  generateDir(dirPatch, componentName, type);

  //   postGenerateFunc[generateObj[type]]?.(srcPath, componentName);

  console.log("success");
  return;
}

const generateObj: GenerateObject = {
  c: "components",
  component: "components",
  i: "icons",
  icon: "icons",
};

const dirSuffix: DirSuffix = {
  components: "",
  icons: "Icon",
};

// const postGenerateFunc = {
//   components: generateComponentsPost,
//   icons: generateIconPost,
// };

const generateTemplatesFiles = {
  components: (componentName: string) => [
    {
      fileName: `${componentName}${dirSuffix.components}.tsx`,
      template: `import React from "react";
        
        import style from "./${componentName}${dirSuffix.components}.module.scss";
        
        interface ${componentName}Props {}
        
        export const ${componentName} = ({}: ${componentName}Props) => {
          return <div className={style.root}></div>;
          };
          `,
    },
    {
      fileName: "index.ts",
      template: `export * from "./${componentName}${dirSuffix.components}";
          `,
    },
    {
      fileName: `${componentName}${dirSuffix.components}.module.scss`,
      template: `.root {}
          `,
    },
  ],
  icons: (componentName: string) => [
    {
      fileName: `${componentName}${dirSuffix.icons}.tsx`,
      template: `import React from "react";
          
          import { IconProps } from "../IconProps";
          
          export const ${componentName}Icon = (props: IconProps) => (<svg></svg>);
          `,
    },
    {
      fileName: "index.ts",
      template: `export * from "./${componentName}Icon";
          `,
    },
  ],
};

function generateFile(fileName: fs.PathOrFileDescriptor, template: string) {
  fs.writeFileSync(fileName, template);
}

function generateDir(dirPatch: string, componentName: any, type: string) {
  if (!fs.existsSync(dirPatch)) {
    fs.mkdirSync(dirPatch);
  }

  const currentResolvePath = path.resolve(
    dirPatch,
    componentName + dirSuffix[generateObj[type]]
  );

  if (!fs.existsSync(currentResolvePath)) {
    // проверка - существует такая директория или нет?
    fs.mkdirSync(currentResolvePath); // если нет, то создаем новую
  } else {
    console.log("err");
    return;
  }

  generateTemplatesFiles?.[generateObj[type]](componentName).forEach(
    (el: { fileName: string; template: any }) => {
      generateFile(path.resolve(currentResolvePath, el.fileName), el.template);
    }
  );

  return;
}
