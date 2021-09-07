import { readdirSync } from 'fs';
import { Directory, File } from '../@types';

export const isDirectory = (fsPath: string) => !(new RegExp('\\.\\w+').exec(fsPath));

const deepReadDirectory = (fsPath: string): (Directory | File)[] => {
  return readdirSync(fsPath).map<Directory | File>((element) => {
    if (isDirectory(element)) {
      return {
        name: element,
        path: `${fsPath}/${element}`,
        elements: deepReadDirectory(`${fsPath}/${element}`),
      } as Directory;
    }

    return { name: element, path: `${fsPath}/${element}` } as File;
  }).filter((element) => element.name !== 'index.ts');
};

export const readDirectory = (fsPath: string) => {
  const directory = deepReadDirectory(fsPath);

  return {
    name: '/',
    path: fsPath,
    elements: directory
  } as Directory;
};
