import { homedir, type } from 'os'
import { SHELLS, chalk } from './constants.js'
import { env, exit } from 'process'
import { access, accessSync, readFileSync, write, writeFile, writeFileSync, constants } from 'fs'
import { join } from 'path'
import { ANSIColorCode } from './colors.js'
import { safe_exec, xdg } from "./utils.js"

/**
 * @typedef {import('./types').Shells} Shells 
 * @typedef {import('./types').PromptComponent} PromptComponent 
 * */


/**
 * return the current shell of the system 
 * @returns {Shells} 
 */
export function getShell() {
  const osname = type()
  if (osname == "Windows_NT") {
    return SHELLS.POWERSHELL
  } else {
    // assuming it's Linux or Mac
    /**@type {(string[])} */
    let shells;
    /**@type {Shells}*/
    let currentShell;
    let result = safe_exec("cat /etc/shells")
    if (result.error != null) {
      console.log(chalk.red("failed to get system login shell"))
      exit(1)
    }
    shells = result.ok.split("\n").map(shell => {
      let arr = shell.split('/')
      return arr[arr.length - 1].toUpperCase()
    });

    result = safe_exec(`ps -p ${process.ppid}| awk 'NR==2 {print $NF}'`)
    if (result.err != null) {
      console.log(chalk.red("failed to get current shell"))
      exit(1)
    }
    currentShell = result.ok.toUpperCase()
    console.log(chalk.bgWhite.red("Detected: " + currentShell.trim()).toString())
    return currentShell.trim()
  }
}

/**
 * @param {string} filename
 * @returns {boolean}
 * */
function checkFile(filename) {
  /**@type {boolean}*/
  let result = true;
  console.log("homedir:", homedir())
  try {
    let homeDir = homedir();
    accessSync(join(homeDir, filename), constants.F_OK)
  } catch (error) {
    result = false;
  }
  return result;
}


/**
 * @param {Shells} shell
 * @returns {string}*/
export function getShellConfigFile(shell) {
  /**@type {string}*/
  let configFile;
  let homeDir = homedir()
  switch (shell) {
    case SHELLS.BASH:
      if (checkFile('.bashrc'))
        configFile = join(homeDir, '.bashrc')
      break
    case SHELLS.CSH:
      if (checkFile('.cshrc'))
        configFile = join(homeDir, '.cshrc')
      break
    case SHELLS.ZSH:
      console.log("hello Zsh")
      if (checkFile('.zshrc'))
        configFile = join(homeDir, '.zshrc')
      break
    case SHELLS.FISH:
      if (checkFile(xdg('fish', 'config.fish')))
        configFile = join(homeDir, xdg('fish', 'config.fish'))
      break
    case SHELLS.CMD:
      break;
    case SHELLS.POWERSHELL:
      break;
  }
  return configFile;
}

