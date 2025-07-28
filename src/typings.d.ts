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

declare var unsafeWindow: typeof window;
