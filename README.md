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
    "cli-create": "node node_modules/ks-react-cli-lib c",
    "cli-generate": "node node_modules/ks-react-cli-lib g"
  }
}
```

### Создание

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

### Генерация

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

## License

Generate React CLI is an open source software [licensed as MIT](https://github.com/Korotkov-S/react-cli/blob/main/LICENSE).
