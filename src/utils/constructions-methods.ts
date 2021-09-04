const fileWithoutType = (file: string) => file.split('.ts')[0];
const removeExtras = (exportName: string) => {
  const splitted = exportName.split(' ');

  if (splitted.length > 1) {
    return splitted[splitted.length - 1];
  }

  return splitted[0];
};

export const exportConstruction: ExportConstructionMethods = {
  asterisk: {
    implementation: (file) => `export * from './${fileWithoutType(file)}';`,
  },
  defaultAs: {
    implementation: (exportName, file) => `export {default as ${removeExtras(exportName)}} from './${fileWithoutType(file)}';`,
  }
};

interface ExportConstructionMethods {
  asterisk: {
    implementation: (file: string) => string;
  },
  defaultAs: {
    implementation: (exportName: string, file: string) => string;
  }
};
