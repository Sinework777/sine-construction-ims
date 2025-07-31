/* global process */
/* eslint-env node */
// This file loads Vite env vars from a .env file and sets them on process.env for Jest
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf-8');
  env.split('\n').forEach(line => {
    const match = line.match(/^VITE_([A-Z0-9_]+)=(.*)$/);
    if (match) {
      const [, key, value] = match;
      process.env[`VITE_${key}`] = value.trim();
    }
  });
}
