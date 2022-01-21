import { readFileSync } from "fs";
import { exportMethods, exportUtils } from "../utils";
import { Directory, ExtractedDirectory, ExtractedFile, ExtractedResult, File } from "../@types";

const deepExportExtractor = (directory: Directory): ExtractedDirectory => {
  const extractedElements = directory.elements.map((element) => {
    if ('elements' in element) {
      return deepExportExtractor(element);
    }

    return extractor(element);
  });

  return {
    ...directory,
    elements: extractedElements,
  };
};

const exportExtractor = (directory: Directory) => {
  return deepExportExtractor(directory);
};

const extractor = (file: File): ExtractedFile => {
  const content = readFileSync(file.path);

  const results = exportMethods.map((method) => ({
    method: method,
    result: exportUtils[method].regex(content.toString()),
  }));

  return {
    ...file,
    results: results.filter((result) => result.result) as ExtractedResult[],
  };
};

export default exportExtractor;
