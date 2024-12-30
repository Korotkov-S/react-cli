export type Components = "icons" | "components";
export const CommandsArray = ["c" , "component" , "i" , "icon"];
export type Commands = typeof CommandsArray[number]

export type GenerateObject = {
  [Key in Commands]: Components;
};

export type DirSuffix = {
  [Key in Components]: string;
};

export type PostGenerateFunc = {
  [Key in Components]?: () => void;
};
