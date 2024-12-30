import { create } from './actions';

function cli() {
  const [action, type, name] = process.argv.slice(2);

  if (action === 'create' || action === 'c') {
    create({ filePath: name, fileType: type });
    return;
  }

  //   if ((action === 'g' || action === 'generate') && type && name) {
  //     if (isCommands(type)) {
  //       generate(type, name);
  //     } else {
  //       console.error('Невозможно выполнить команду');
  //     }

  //     return;
  //   }

  console.error('Невозможно выполнить команду');
}

cli();
