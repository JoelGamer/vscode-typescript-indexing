import { lstatSync } from 'fs';
import { Uri, window } from 'vscode';
import { readDirectory } from '../utils';
import { Directory } from '../@types';
import deepFileConstruction from './construct-file';
import exportExtractor from './extractor';

const directoryDeepness = (directory: Directory) => {
  return directory.elements.reduce<number>((deepness, element) => {
    if ('elements' in element) {
      directoryDeepness(element);
      return deepness += 1;
    }

    return deepness;
  }, 0);
};

const generateIndex = (target: Uri) => {
  if (!lstatSync(target.fsPath).isDirectory()){
    console.error('Attempted to generate index from a file!');
    return;
  }
  
  try {
    window.showInformationMessage('Generating index.ts...');
    const directory = readDirectory(target.fsPath);
    const directoryExport = exportExtractor(directory);
    deepFileConstruction(directoryExport);
    window.showInformationMessage(`Generated successfully index.ts on path ${target.fsPath} of deepness: ${directoryDeepness(directory)}`);
  } catch (e) {
    window.showErrorMessage('A problem occurred when generating the index.ts file!');
    console.error(e);
  }
};

export default generateIndex;
