import { writeFileSync } from "fs";
import { ExtractedDirectory, ExtractedResult } from "../@types";
import { exportRegexResult, exportUtils } from "../utils";
import { exportConstruction } from "../utils/constructions-methods";

const indexFile = (fsPath: string) => `${fsPath}/index.ts`;

const hasMoreThanOneMethod = (results: ExtractedResult[]) => {
  const hasExportDefault = !!results.find((result) => result.method === 'exportDefault');
  const hasExport = !!results.find((result) => result.method === 'export');

  return hasExportDefault && hasExport;
};

const deepFileConstruction = (directory: ExtractedDirectory) => {
  let fileContent = '';

  directory.elements.map((element) => {
    if ('elements' in element) {
      deepFileConstruction(element);
      fileContent += exportConstruction.asterisk.implementation(element.name);
    } else {
      if (hasMoreThanOneMethod(element.results)) {
        fileContent += exportConstruction.asterisk.implementation(element.name);
      } else {
        fileContent += element.results.reduce<string>((results, result) => {
          results += result.method === 'export'
            ? exportConstruction.asterisk.implementation(element.name)
            : exportConstruction.defaultAs.implementation(
              exportRegexResult(result.result, exportUtils[result.method].group), element.name
            );
  
          return results;
        }, '');
      }
    }

    fileContent += '\n';
  });

  writeFileSync(indexFile(directory.path), fileContent);
};

export default deepFileConstruction;
