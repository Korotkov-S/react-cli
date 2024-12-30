import { PathOrFileDescriptor, writeFileSync } from 'fs';

export function createFile(fileName: PathOrFileDescriptor, template: string) {
  writeFileSync(fileName, template);
}
