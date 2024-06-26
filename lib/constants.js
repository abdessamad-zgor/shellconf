import { Chalk } from 'chalk';

export const SHELLS = Object.freeze({
  BASH: 'BASH',
  FISH: 'FISH',
  ZSH: 'ZSH',
  CSH: 'CSH',
  POWERSHELL: 'POWERSHELL',
  CMD: "CMD"
})

export const TERMINALS = Object.freeze({
  ALACRITTY: 'ALACRITTY',
  GNOME: 'GNOME',
  ITERM: 'ITERM',
  WINDOWS: 'WINDOWS'
})

export const ANSIBasicColor = Object.freeze({
  FG_BLACK: 30,
  FG_RED: 31,
  FG_GREEN: 32,
  FG_YELLOW: 33,
  FG_BLUE: 34,
  FG_MAGENTA: 35,
  FG_CYAN: 36,
  FG_WHITE: 37,
  BG_BLACK: 40,
  BG_RED: 41,
  BG_GREEN: 42,
  BG_YELLOW: 43,
  BG_BLUE: 44,
  BG_MAGENTA: 45,
  BG_CYAN: 46,
  BG_WHITE: 47,
})

let chalk = new Chalk();
chalk.level = 1

export { chalk }
