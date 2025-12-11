/// <reference types="google.maps" />

// Ensure the Google Maps namespace is available globally once the script loads.
export {};

declare global {
  interface Window {
    google: typeof google;
  }
}
