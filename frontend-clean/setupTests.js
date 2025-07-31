/* eslint-disable no-undef */
import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for Jest (jsdom)
import { TextEncoder, TextDecoder } from 'util';
if (typeof globalThis.TextEncoder === 'undefined') {
  globalThis.TextEncoder = TextEncoder;
}
if (typeof globalThis.TextDecoder === 'undefined') {
  globalThis.TextDecoder = TextDecoder;
}
// Mock canvas getContext for jsPDF and html2canvas in Jest
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = HTMLCanvasElement.prototype.getContext || (() => { return {}; });
}

// Mock HTMLCanvasElement.getContext globally for jsdom
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => {
    // Return a minimal mock context with required methods for signature_pad, react-signature-canvas, etc.
    return {
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      getImageData: jest.fn(() => ({ data: [] })),
      putImageData: jest.fn(),
      createImageData: jest.fn(() => []),
      setTransform: jest.fn(),
      drawImage: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      translate: jest.fn(),
      scale: jest.fn(),
      rotate: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn(() => ({ width: 0 })),
      transform: jest.fn(),
      rect: jest.fn(),
      clip: jest.fn(),
      // Add any other methods/properties needed by your code
      canvas: document.createElement('canvas'),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 1,
      setLineDash: jest.fn(),
      getLineDash: jest.fn(() => []),
    };
  });
}

// Mock import.meta.env for Vite env variables in Jest
if (!globalThis.import) {
  globalThis.import = {};
}
if (!globalThis.import.meta) {
  globalThis.import.meta = {};
}
if (!globalThis.import.meta.env) {
  globalThis.import.meta.env = {};
}
Object.assign(globalThis.import.meta.env, {
  VITE_FIREBASE_API_KEY: 'test-api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
  VITE_FIREBASE_PROJECT_ID: 'test-project-id',
  VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-messaging-sender-id',
  VITE_FIREBASE_APP_ID: 'test-app-id',
  VITE_FIREBASE_MEASUREMENT_ID: 'test-measurement-id',
});

// Polyfill process.env for Jest (for firebase.js compatibility)
if (!globalThis.process) {
  globalThis.process = {};
}
if (!globalThis.process.env) {
  globalThis.process.env = {};
}
Object.assign(globalThis.process.env, {
  VITE_FIREBASE_API_KEY: 'test-api-key',
  VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
  VITE_FIREBASE_PROJECT_ID: 'test-project-id',
  VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'test-messaging-sender-id',
  VITE_FIREBASE_APP_ID: 'test-app-id',
  VITE_FIREBASE_MEASUREMENT_ID: 'test-measurement-id',
});
