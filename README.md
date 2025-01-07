# KS REACT CLI

## Why?

Стандартизация процессов и наличие готовых компонентов позволяют значительно сократить время на разработку и поддержку приложений.
При создании элемента вы можете самостоятельно выбирать путь по которому будет создан файл. Но вы можете придерживаться нашей структуры папок в проекте, используя функцию генерации файлов

## Get Started:

установите пакет

```
npm i -D ks-react-cli-lib
```

добавьте скрипт в свой `package.json`

```json
{
  "scripts": {
    "cli-create": "node node_modules/ks-react-cli-lib create",
    "cli-generate": "node node_modules/ks-react-cli-lib generate"
  }
}
```

### Создание

#### Создание компонента

```
npm run cli-create component Box
```

```
|-- /src
    |-- /Box
        |-- Box.tsx
        |-- Box.css
        |-- index.ts
```

#### Создание кастомного хука

```
npm run cli-create hook CustomHook
```

|-- /src
    |-- /CustomHook
        |-- CustomHook.ts
        |-- index.ts
        

### Генерация

При генерации компонентов на текущем этапе используются пути и названия папок которые мы используем в своем стайл гайде, в дальнейшем внесение изменений будет возможно через конфигурационный файл. Так же для удобства реимпорта и что бы следовать нашему стайл гайду, создается index.ts(js) файл в котором сгенерированный элемент реэкспортируется.

#### Генерация компонента

```
npm run cli-generate component Box
```

```
|-- /src
    |-- /components
        |-- /Box
            |-- Box.tsx
            |-- Box.css
            |-- index.ts
        |-- index.ts
```

#### Генерация кастомного хука

```
npm run cli-generate hook CustomHook
```

|-- /src
    |-- /hooks
        |-- /CustomHook
            |-- CustomHook.ts
            |-- index.ts
        index.ts




## Table of Contents:

[config](#config-file)
[templates]()

## Config File

конфигурация установленная по умолчанию:

```json
{
  "creatingDir": "src",
  "useTypescript": true,
  "useCssPreprocessors": "css"
}
```

вы можете изменить её создав `ks-cli.config.json` в корне вашего проекта.

| Параметр            | Возможный тип         |
| ------------------- | --------------------- |
| creatingDir         | string                |
| useTypescript       | boolean               |
| useCssPreprocessors | `scss`, `css`, `sass` |

## Templates

### Components

`Box.tsx`

```ts
import React from 'react';

import style from './Box.module.css';

export interface BoxProps {}

export const Box = ({}: BoxProps) => {
  return <div className={style.root}></div>;
};
```

`Box.css`

```css
.root {
}
```

`index.ts`

```ts
export * from './Box';
```

### Hooks
`CustomHook.ts`

``` ts
import React from "react";

export const useCustomHook = () => {
  console.log("custom hook useCustomHook");
};

```

`index.ts`

```ts
export * from './Box';
```

## License

Generate React CLI is an open source software [licensed as MIT](https://github.com/Korotkov-S/react-cli/blob/main/LICENSE).
