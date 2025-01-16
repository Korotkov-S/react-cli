import { Components } from '../types';
import { Config } from './defaultConfig';

export type DirSuffix = {
  [Key in Components]?: string;
};

const dirSuffix: DirSuffix = {
  components: '',
};

export type FileProp ={
  fileName: string,
  template: string
}

export type DefaultTemplate = {
  [Key in Components] : (componentName: string, config: Config) =>  FileProp[]
}

export const defaultTemplate : DefaultTemplate = {
  components: (componentName: string, config: Config) => [
    {
      fileName: `${componentName}${dirSuffix.components}.${
        config.useTypescript ? 't' : 'j'
      }sx`,
      template: `import React from "react";

import style from "./${componentName}${dirSuffix.components}.module.${
        config.useCssPreprocessors
      }";

${config.useTypescript ? `export interface ${componentName}Props {}` : ''}

export const ${componentName} = ({}: ${componentName}Props) => {
  return <div className={style.root}></div>;
};
`,
    },
    {
      fileName: `index.${config.useTypescript ? 't' : 'j'}s`,
      template: `export * from "./${componentName}${dirSuffix.components}";
`,
    },
    {
      fileName: `${componentName}${dirSuffix.components}.module.${config.useCssPreprocessors}`,
      template: `.root {}
`,
    },
  ],
  hook: (componentName: string, config: Config) => [
    {
      fileName: `${componentName}.${config.useTypescript ? 't' : 'j'}s`,
      template: `import React from "react";

export const ${componentName} = () => {
  console.log("custom hook ${componentName}");
};
`,
    },
    {
      fileName: `index.${config.useTypescript ? 't' : 'j'}s`,
      template: `export * from "./${componentName}";
`,
    },
  ],
  type: (componentName: string, config:Config) => [

    {
      fileName: `${componentName}.${config.useTypescript? 'ts': 'js'}`,
      template: ``
    }
  ]

};
