import { homedir, type } from 'os'
import { exec, execSync, spawnSync } from 'child_process'
import { SHELLS, chalk } from './constants.js'
import { env, exit } from 'process'
import { access, accessSync, readFileSync, write, writeFile, writeFileSync, constants } from 'fs'
import { join } from 'path'
import { ANSIColorCode } from './colors.js'

/**
 * @typedef {import('./types').Shells} Shells 
 * @typedef {import('./types').PromptComponent} PromptComponent 
 * */

/**
 * @param {string} cmd
 * @returns {{ok: string, err: Error}}
 * */
function safeExec(cmd) {
  try {
    let output = execSync(cmd, { encoding: 'utf8' });
    return { ok: output.toString(), err: null }
  } catch (error) {
    return { ok: null, err: error }
  }
}

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
    let result = safeExec("cat /etc/shells")
    if (result.error != null) {
      console.log(chalk.red("failed to get system login shell"))
      exit(1)
    }
    shells = result.ok.split("\n").map(shell => {
      let arr = shell.split('/')
      return arr[arr.length - 1].toUpperCase()
    });

    result = safeExec(`ps -p ${process.ppid}| awk 'NR==2 {print $NF}'`)
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
 * @param {string} program
 * @param {string} filename
 *
 * @returns {string}*/
function xdg(program, filename) {
  return join('.config', program, filename);
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
  console.log(configFile)
  return configFile;
}

/**
 * @param {string} prompt
 * @returns {string}
 * */
export function fish_prompt(prompt) {
  return `function fish_prompt\n\techo -e "${prompt}"\nend`
}

/**
 * @param {string} prompt
 * @returns {string}
 * */
export function zsh_prompt(prompt) {
  return `PROMPT="${prompt}"`
}

/**
 * @param {string} prompt
 * @returns {string}
 * */
export function ps1_prompt(prompt) {
  return `PS1="${prompt}"`
}

/**
 * @param {Shells} shell
 * @param {string} cmd*/
export function shell_prompt(shell, prompt) {
  return shell == SHELLS.FISH ? fish_prompt(prompt) : shell == SHELLS.ZSH ? zsh_prompt(prompt) : ps1_prompt(prompt)
}

/**@param {string} cmd*/
export function fish_expand(cmd) {
  return `$(${cmd})`
}

/**@param {string} cmd*/
export function sh_expand(cmd) {
  return `$(${cmd})`
}

/**
 * @param {Shells} shell
 * @param {string} cmd*/
export function shell_expand(shell, cmd) {
  return SHELLS.FISH == shell ? fish_expand(cmd) : sh_expand(cmd)
}

/**
 * @param {Shells} shell
 * @param {string} component 
 * */
export function evalComp(shell, component) {
  let isCommand = spawnSync(shell.toLowerCase(), ["-c", component]);
  if (isCommand.stdout.toString() && !isCommand.error) {
    return shell_expand(shell, component)
  }
  if (component.charAt(0) == '$' && Object.keys(process.env).includes(component.slice(1))) {
    return component
  }

  else return component
}
