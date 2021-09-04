import { readFileSync } from "fs";
import { exportMethods, ExportTypes, exportUtils } from "../utils";

const exportExtractor = (files: string[], fsPath: string): ExtractorFileResult[] => {
  return files.map((file) => {
    const content = readFileSync(`${fsPath}/${file}`);

    return {
      file: file,
      results: extractor(content.toString()),
    };
  });
};

const extractor = (content: string) => {
  const results = exportMethods.map((method) => ({
    method: method,
    result: exportUtils[method].regex(content),
  }));

  return results.filter((result) => result.result) as ExtractorResult[];
};

export default exportExtractor;

export interface ExtractorFileResult {
  file: string;
  results: ExtractorResult[];
}

export interface ExtractorResult {
  method: ExportTypes;
  result: RegExpExecArray;
}
