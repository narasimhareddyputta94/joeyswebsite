// src/types/google.d.ts
export {};

declare global {
  // Available in the browser after the Maps JS API loads
  interface Window {
    google: any; // or: google: typeof google;
  }
  const google: any;
}
