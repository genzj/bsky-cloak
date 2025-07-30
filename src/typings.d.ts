// Fix the TypeScript error
// "Cannot find module './logo.svg' or its corresponding type declarations."
declare module "*.html" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const content: string;
  export default content;
}

declare let unsafeWindow: typeof window;

// Greasemonkey/Tampermonkey API
declare function GM_getValue<T>(key: string, defaultValue?: string): T;
declare function GM_setValue<T>(key: string, value: T): void;
declare function GM_registerMenuCommand(name: string, callback: (event: MouseEvent | KeyboardEvent) => void, accessKey?: string): number;
declare function GM_registerMenuCommand(name: string, callback: (event: MouseEvent | KeyboardEvent) => void, options?: {
  id?: number | string;
  accessKey?: string;
  autoClose?: boolean;
  title?: string;
}): number;
