import { homedir, type } from 'os'
import { exec } from 'child_process'
import { SHELLS, chalk } from './constants'
import { env, exit } from 'process'
import { access, accessSync } from 'fs'
import { join } from 'path'
import { constants } from 'buffer'

/**
 * @typedef {import('./types').Shells} Shells 
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
    exec("cat /etc/shells", (error, stdout, stderr) => {
      if (error != null) {
        console.log(chalk.red("failed to get system login shells"))
        exit(1)
      }
      shells = stdout.split("\n")
    })
    shells = shells.map(shell => {
      let arr = shell.split('/')
      return arr[arr.length - 1].toUpperCase()
    });
    // fish differs from other shells is several ways $fish_pid for shell pid is one of em
    if (shells.includes(SHELLS.FISH)) {
      exec("ps -p $fish_pid| awk 'NR==2 {print $NF}'", (error, stdout, stderr) => {
        currentShell = stdout.toUpperCase()
      })
      if (currentShell) return currentShell;
    }
    exec("ps -p $$ | awk 'NR==2 {print $NF}'", (error, stdout, stderr) => {
      if (error != null) {
        console.log(chalk.red("failed to get current shell"))
        exit(1)
      }
      currentShell = stdout.toUpperCase()
    })
    return currentShell
  }
}

/**
 * @param {string} filename
 * @returns {boolean}
 * */
function checkFile(filename) {
  /**@type {boolean}*/
  let result = true;
  try {
    let homeDir = homedir()
    accessSync(join(homeDir, filename), constants.F_OK)
  } catch (error) {
    result = false
  }
  return result
}

/**
 * @param {string} program
 * @param {string} filename
 *
 * @returns {string}*/
function xdg(program, filename) {
  /**@type {string}*/
  let xdgDir = process.env['XDG_CONFIG_HOME'];
  return join(xdgDir, program, filename);
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
    case SHELLS.CSH:
      if (checkFile('.cshrc'))
        configFile = join(homeDir, '.cshrc')
    case SHELLS.ZSH:
      if (checkFile('.zshrc'))
        configFile = join(homeDir, '.zshrc')
    case SHELLS.FISH:
      if (checkFile(xdg('fish', 'config.fish')))
        configFile = join(homeDir, xdg('fish', 'config.fish'))
    case SHELLS.CMD:
      break;
    case SHELLS.POWERSHELL:
      break;
  }
  return configFile
}

