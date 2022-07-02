interface ImportMetaEnv {
  readonly VITE_CLIENT_ID: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_MY_SECRET: string;

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
