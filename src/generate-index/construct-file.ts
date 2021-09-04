import { exportRegexResult, exportUtils } from "../utils";
import { exportConstruction } from "../utils/constructions-methods";
import { ExtractorFileResult, ExtractorResult } from "./extractor";

const hasMoreThanOneMethod = (results: ExtractorResult[]) => {
  const hasExportDefault = !!results.find((result) => result.method === 'exportDefault');
  const hasExport = !!results.find((result) => result.method === 'export');

  return hasExportDefault && hasExport;
};

const constructFile = (filesExport: ExtractorFileResult[]) => {
  return filesExport.reduce<string>((fileContent, fileExport) => {
    if (hasMoreThanOneMethod(fileExport.results)) {
      fileContent += exportConstruction.asterisk.implementation(fileExport.file);
    } else {
      fileContent += fileExport.results.reduce<string>((results, result) => {
        results += result.method === 'export'
          ? exportConstruction.asterisk.implementation(fileExport.file)
          : exportConstruction.defaultAs.implementation(
            exportRegexResult(result.result, exportUtils[result.method].group), fileExport.file
          );

        return results;
      }, '');
    }

    fileContent += '\n';
    return fileContent;
  }, '');
};

export default constructFile;
