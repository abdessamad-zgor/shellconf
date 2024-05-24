import express from 'express';
import { getShellConfigFile, getShell, Environment } from './lib/shell.js';
import { zbPrompt } from './lib/presets.js';

let environment = new Environment();

let app = express()
let shell = getShell()
console.log(getShellConfigFile(shell))
environment.setPrompt(zbPrompt)


export const listen = () => app.listen(4322, () => {
  console.log("Server is listening...")
})
