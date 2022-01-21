export const exportUtils: ExportUtil = {
  export: {
    regex: (content) => new RegExp('^export (?!default)((\\w|\\s|{?)*)', 'gm').exec(content),
    group: 1,
  },
  exportDefault: {
    regex: (content) => new RegExp('^export default ((\\w|\\s)*)', 'gm').exec(content),
    group: 1,
  },
  exportIndex: {
    regex: (content) => new RegExp("^(export \\* from '.+';|export {default as \\w+} from '.+';)").exec(content),
    group: 0,
  }
};

export const exportRegexResult = (result: RegExpExecArray, methodGroup: number) => {
  return result[methodGroup].trimEnd();
};

export const exportMethods = Object.keys(exportUtils) as ExportTypes[];

export type ExportTypes = 'export' | 'exportDefault' | 'exportIndex';

type ExportUtil = {
  [key in ExportTypes]: {
    regex: (content: string) => RegExpExecArray | null;
    group: number;
  }
};