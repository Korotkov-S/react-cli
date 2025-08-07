# KS REACT CLI

## Зачем это нужно?

Стандартизация процессов и наличие готовых шаблонов компонентов позволяют значительно ускорить разработку и сопровождение React-приложений. CLI-утилита автоматически создаёт структуру файлов и кода по вашему стилю.

## Быстрый старт

1. Установите пакет:

```bash
npm i -D ks-react-cli-lib
```

2. Добавьте скрипт в `package.json`:

```json
{
  "scripts": {
    "cli-create": "ks-react-cli"
  }
}
```

3. Запустите генератор:

```bash
npm run cli-create
```

4. Следуйте инструкциям в терминале: выберите тип сущности и введите имя.

## Поддерживаемые типы сущностей

- Компонент (component)
- Хук (hook)
- Тип (type)
- Хелпер (helper)
- DTO (dto)
- Сервис (service)
- Иконка (icon)
- Страница/экран (page/screen)
- Контекст (context)

Каждый тип имеет свой шаблон и структуру файлов. Префиксы/суффиксы добавляются автоматически.

## Кастомизация

- Для расширения или переопределения типов сущностей создайте файл `cli-config.cjs` в корне проекта.
- Можно изменить пути, шаблоны файлов, добавить свои типы сущностей.

Пример пользовательского конфига:

```js
module.exports = {
  componentTypes: [
    {
      path: "./src/widgets",
      name: "widget",
      prefix: "",
      suffix: "Widget",
      files: (nameFile) => [
        {
          fileName: `${nameFile}.tsx`,
          template: `import React from "react";

export const ${nameFile} = () => {
  return <div>${nameFile}</div>;
};
`,
        },
        {
          fileName: `index.ts`,
          template: `export * from "./${nameFile}";
`,
        },
        // Можно добавить другие файлы по необходимости
      ],
    },
    // ...другие типы
  ],
};
```

## Примеры шаблонов

**Компонент:**

```tsx
import React from "react";
import style from "./Box.module.css";

export interface BoxProps {}

export const Box = ({}: BoxProps) => {
  return <div className={style.root}></div>;
};
```

**Хук:**

```tsx
import React from "react";

export const useUser = () => {
  console.log("custom hook useUser");
};
```

**Тип:**

```ts
export type User = {};
```

**Хелпер:**

```ts
export class UserHelper {};
```

**DTO:**

```ts
export class UserDto {
  serialize<T>(): Record<string, T> {
    const dto: Record<string, T> = Object.assign(this);
    Object.keys(dto).forEach(key => {
      if (dto[key] === undefined) {
        delete dto[key];
      }
    });
    return dto;
  }
}
```

**Сервис:**

```ts
export class UserService {};
```

**Иконка:**

```tsx
import React from "react";
interface IconArrowProps extends React.SVGProps<SVGSVGElement> {}

export const IconArrow = (props: IconArrowProps) => ();
```

**Страница/экран:**

```tsx
import React from "react";
import style from "./MainScreen.module.css";

export interface MainScreenProps {}

export const MainScreen = ({}: MainScreenProps) => {
  return <div className={style.root}></div>;
};
```

**Контекст:**

```tsx
import React from "react";
export type RootProviderProps = {
  children: React.ReactNode;
};

export const RootContext = React.createContext({});
export const RootProvider = ({children}: RootProviderProps) => (
  <RootContext.Provider value={{}}>
    {children}
  </RootContext.Provider>
);
```

## Лицензия

Открытое ПО под лицензией [MIT](./LICENSE).
