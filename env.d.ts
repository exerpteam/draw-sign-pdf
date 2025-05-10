/// <reference types="vite/client" />

declare module '*.mjs?url' {
  const src: string;
  export default src;
}

declare module '*.js?url' {
  const src: string;
  export default src;
}