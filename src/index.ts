import { create } from './actions';
import { generate } from './actions/generate/generate';

function cli() {
  const [action, type, name] = process.argv.slice(2);

  if ((action === 'create' || action === 'c') && type && name) {
    create({ filePath: name, fileType: type });
    return;
  }

  if ((action === 'g' || action === 'generate') && type && name) {
    generate(type, name);
    return;
  }

  console.error('Невозможно выполнить команду');
}

cli();
