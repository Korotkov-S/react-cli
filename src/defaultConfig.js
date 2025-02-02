const { upperName } = require("./helpers");

// config.js
module.exports = {
  scriptLang: "ts",
  styleLang: "scss",
  componentTypes: [
    {
      path: "./src/components",
      name: "component",
      prefix: "",
      files: (componentName) => [
        {
          fileName: `${upperName(componentName)}.${"ts"}x`,
          template: `import React from "react";
    
import style from "./${upperName(componentName)}.module.${"scss"}";
    
   
export interface ${upperName(componentName)}Props {}       

    
export const ${upperName(componentName)} = ({}: ${upperName(
            componentName
          )}Props) => {
  return <div className={style.root}></div>;
};
`,
        },
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${upperName(componentName)}";
`,
        },
        {
          fileName: `${upperName(componentName)}.module.${"scss"}`,
          template: `.root {}
`,
        },
      ],
    },

    {
      path: "./src/hooks",
      name: "hook",
      prefix: "use",
      files: (componentName) => [
        {
          fileName: `${componentName}.${"ts"}`,
          template: `import React from "react";
    
export const ${componentName} = () => {
  console.log("custom hook ${componentName}");
};
`,
        },
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${componentName}";
`,
        },
      ],
    },
  ],
};
