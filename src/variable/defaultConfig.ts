export const defaultConfig: Config = {
  creatingDir: 'src',
  useTypescript: true,
  useCssPreprocessors: 'css',
};

export type Config = {
  creatingDir: string;
  useTypescript: boolean;
  useCssPreprocessors: 'scss' | 'less' | 'sass' | 'css';
};
