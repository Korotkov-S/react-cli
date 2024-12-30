import { Components } from '../types';
import { Config } from './defaultConfig';

export type DirSuffix = {
  [Key in Components]: string;
};

const dirSuffix: DirSuffix = {
  components: '',
  icons: 'Icon',
};

export const defaultTemplate = {
  components: (componentName: string, config: Config) => [
    {
      fileName: `${componentName}${dirSuffix.components}.${
        config.useTypescript ? 't' : 'j'
      }sx`,
      template: `import React from "react";

import style from "./${componentName}${dirSuffix.components}.module.${
        config.useCssPreprocessors
      }";

${config.useTypescript ? `interface ${componentName}Props {}` : ''}

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
  //   icons: (componentName: string) => [
  //     {
  //       fileName: `${componentName}${dirSuffix.icons}.tsx`,
  //       template: `import React from "react";

  //             import { IconProps } from "../IconProps";

  //             export const ${componentName}Icon = (props: IconProps) => (<svg></svg>);
  //             `,
  //     },
  //     {
  //       fileName: 'index.ts',
  //       template: `export * from "./${componentName}Icon";
  //             `,
  //     },
  //   ],
};
