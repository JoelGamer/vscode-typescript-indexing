import { lstatSync, readdirSync, writeFileSync } from 'fs';
import { Uri, window } from 'vscode';
import constructFile from './construct-file';
import exportExtractor from './extractor';

const indexFile = (fsPath: string) => `${fsPath}/index.ts`;

const generateIndex = (target: Uri) => {
  if (!lstatSync(target.fsPath).isDirectory()){
    console.error('Attempted to generate index from a file!');
    return;
  }
  
  const files = readdirSync(target.fsPath);

  if (files.find((file) => file === 'index.ts')) {
    window.showInformationMessage('There is already an index.ts on this directory');
    return;
  }

  try {
    window.showInformationMessage('Generating index.ts...');
    const filesExport = exportExtractor(files, target.fsPath);
    writeFileSync(indexFile(target.fsPath), constructFile(filesExport));
    window.showInformationMessage(`Generated successfully index.ts on path ${target.fsPath}`);
  } catch (e) {
    window.showErrorMessage('A problem occurred when generating the index.ts file!');
    console.error(e);
  }
};

export default generateIndex;
