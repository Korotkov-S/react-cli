import { Commands, CommandsArray } from "./type";
import { generate } from "./generate";

function isCommands(command: string): command is Commands {
  return CommandsArray.indexOf(command as Commands) != -1;
}

function cli() {
  const [action, type, name] = process.argv.slice(2);

  if ((action === "g" || action === "generate") && type && name) {
    if (isCommands(type)) {
      generate(type, name);
    } else {
      console.error("Невозможно выполнить команду");
    }

    return;
  }

  console.error("Невозможно выполнить команду");
}

cli();
