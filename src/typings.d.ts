// Fix the TypeScript error
// "Cannot find module './logo.svg' or its corresponding type declarations."
declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare let unsafeWindow: typeof window;

// Greasemonkey/Tampermonkey API
declare function GM_getValue(key: string, defaultValue?: string): unknown;

declare function GM_setValue(key: string, value: unknown): void;

declare function GM_registerMenuCommand(
  name: string,
  callback: (event: MouseEvent | KeyboardEvent) => void,
  accessKey_or_options?:
    | string
    | {
      id?: number | string;
      accessKey?: string;
      autoClose?: boolean;
      title?: string;
    }
): number;
