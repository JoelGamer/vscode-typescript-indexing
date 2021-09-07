import { ExportTypes } from "../utils";

export interface File {
  name: string;
  path: string;
}

export interface Directory extends File {
  elements: (Directory | File)[];
}

export interface ExtractedResult {
  method: ExportTypes;
  result: RegExpExecArray;
}

export interface ExtractedFile {
  name: string;
  path: string;
  results: ExtractedResult[];
}

export interface ExtractedDirectory {
  name: string;
  path: string;
  elements: (ExtractedDirectory | ExtractedFile)[] 
}