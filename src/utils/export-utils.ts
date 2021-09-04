export const exportUtils: ExportUtil = {
  export: {
    regex: (content) => new RegExp('^export (?!default)(\\w+ \\w+)', 'gm').exec(content),
    group: 1,
  },
  exportDefault: {
    regex: (content) => new RegExp('^export default (\\w+ \\w+|\\w+)', 'gm').exec(content),
    group: 1,
  },
};

export const exportRegexResult = (result: RegExpExecArray, methodGroup: number) => {
  return result[methodGroup];
};

export const exportMethods = Object.keys(exportUtils) as ExportTypes[];

export type ExportTypes = 'export' | 'exportDefault';

type ExportUtil = {
  [key in ExportTypes]: {
    regex: (content: string) => RegExpExecArray | null;
    group: number;
  }
};