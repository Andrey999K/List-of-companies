interface ImportMetaEnv {
  MODE: string;
  BASE_URL: string;
  PROD: boolean;
  DEV: boolean;
}

declare global {
  interface ImportMeta {
    // @ts-ignore
    readonly env: ImportMetaEnv;
  }
}

const isDev = (): boolean => {
  return import.meta.env.MODE === "development";
};

export default isDev;
