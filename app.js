import express from 'express';
import { Environment } from './lib/core.js';
import { bashPrompt, zbPrompt, zshPrompt } from './lib/presets.js';

let environment = new Environment();

let app = express()
environment.setPrompt(bashPrompt)

export const listen = () => app.listen(4322, () => {
  console.log("Server is listening...")
})
