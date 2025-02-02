module.exports = {
  scriptLang: "ts",
  styleLang: "css",
  componentTypes: [
    {
      path: "./src/components",
      name: "component",
      prefix: "",
      suffix: "",
      files: (cn) => [
        {
          fileName: `${cn}.${"ts"}x`,
          template: `import React from "react";
    
import style from "./${cn}.module.${"css"}";
    
   
export interface ${cn}Props {}       

    
export const ${cn} = ({}: ${cn}Props) => {
  return <div className={style.root}></div>;
};
`,
        },
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.module.${"css"}`,
          template: `.root {}
`,
        },
      ],
    },

    {
      path: "./src/hooks",
      name: "hook",
      prefix: "use",
      suffix: "",
      files: (cn) => [
        {
          fileName: `${cn}.${"tsx"}`,
          template: `import React from "react";
    
export const ${cn} = () => {
  console.log("custom hook ${cn}");
};
`,
        },
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
      ],
    },
    {
      path: "./src/types",
      name: "type",
      prefix: "",
      suffix: "",
      files: (cn) => [
        {
          fileName: `${cn}.${"ts"}`,
          template: `export type ${cn} = {};
`,
        },
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
      ],
    },
    {
      path: "./src/helpers",
      name: "helper",
      prefix: "",
      suffix: "Helper",
      files: (cn) => [
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.${"ts"}`,
          template: `export class ${cn} {};
`,
        },
      ],
    },
    {
      path: "./src/dto",
      name: "dto",
      prefix: "",
      suffix: "Dto",
      files: (cn) => [
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.${"ts"}`,
          template: `export class ${cn} {
  serialize<T>(): Record<string, T> {
    const dto: Record<string, T> = Object.assign(this);

    Object.keys(dto).forEach(key => {
      if (dto[key] === undefined) {
      delete dto[key];
      }
    });

      return dto;
    }
};
`,
        },
      ],
    },
    {
      path: "./src/services",
      name: "service",
      prefix: "",
      suffix: "Service",
      files: (cn) => [
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.${"ts"}`,
          template: `export class ${cn} {};
`,
        },
      ],
    },
    {
      path: "./src/icons",
      name: "icon",
      prefix: "Icon",
      suffix: "",
      files: (cn) => [
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.${"ts"}x`,
          template: `import React from "react"
interface ${cn}Props extends React.SVGProps<SVGSVGElement> {}

export const ${cn} = (props: ${cn}Props) => ();
`,
        },
      ],
    },
    {
      path: "./src/screens",
      name: "page (screen)",
      prefix: "",
      suffix: "Screen",
      files: (cn) => [
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.${"ts"}x`,
          template: `import React from "react";
    
import style from "./${cn}.module.${"css"}";
    
   
export interface ${cn}Props {}       

    
export const ${cn} = ({}: ${cn}Props) => {
  return <div className={style.root}></div>;
};
`,
        },
        {
          fileName: `${cn}.module.${"css"}`,
          template: `.root {}
`,
        },
      ],
    },
    {
      path: "./src/providers",
      name: "context",
      prefix: "",
      suffix: "Provider",
      files: (cn) => [
        {
          fileName: `index.${"ts"}`,
          template: `export * from "./${cn}";
`,
        },
        {
          fileName: `${cn}.${"ts"}x`,
          template: `import React from "react";
export type ${cn}Props = {
  children: React.ReactNode;
};

export const ${cn.replace("Provider", "")}Context = React.createContext({});

export const ${cn} = ({children}: ${cn}Props) => {

  return  (
    <${cn.replace("Provider", "")}Context.Provider
      value={{}}
    >
      {children}
    </${cn.replace("Provider", "")}Context.Provider>
  );
}
`,
        },
      ],
    },
  ],
};
