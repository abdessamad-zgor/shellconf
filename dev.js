import { join } from 'path';
import process from 'process'
import { spawn } from 'child_process';
import { chalk } from './lib/constants.js';
import { listen } from './app.js';
import os from 'os';

let root_path = import.meta.dirname
const log = console.log

let web = spawn('bash', [join(root_path, `scripts/dev.sh`)]);

web.on('spawn', () => {
  log(chalk.bgCyan.gray("Starting Front-end server"))
})

web.stdout.on('data', (chunck) => {
  log(chalk.bold.bgCyan.grey("[Frontend]").concat(chalk.blue(`[ INFO::${(new Date(Date.now())).toISOString()} ]:`)).concat(chunck))
});
web.stderr.on('data', (chunck) => {
  log(chalk.bold.bgCyan.grey("[Frontend]").concat(chalk.bold.redBright("[ERROR]")).concat(chalk.blue(`${(new Date(Date.now())).toISOString()} ::`)).concat(chunck))
});

