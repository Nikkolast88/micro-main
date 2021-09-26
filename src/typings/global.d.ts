// eslint-disable-next-line no-unused-vars
interface Apps {
  loader: () => void;
  name: string;
  entry: string;
  container: string;
  activeRule: string;
}
interface Window {
  manifest: {
    API: string;
    NAME: string;
    APPS: Apps[];
  };
}
