import { Chalk } from 'chalk';
export const SHELLS = Object.freeze({
  BASH: 'BASH',
  FISH: 'FISH',
  ZSH: 'ZSH',
  CSH: 'CSH',
  POWERSHELL: 'POWERSHELL',
  CMD: "CMD"
})

let chalk = new Chalk();
chalk.level = 1

export { chalk }
