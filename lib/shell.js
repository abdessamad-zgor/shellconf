import { homedir, type } from 'os'
import { exec, execSync } from 'child_process'
import { SHELLS, chalk } from './constants.js'
import { argv0, env, exit } from 'process'
import { access, accessSync, readFileSync, write, writeFile, writeFileSync, constants } from 'fs'
import { join } from 'path'
import { ANSIColorCode } from './colors.js'

/**
 * @typedef {import('./types').Shells} Shells 
 * @typedef {import('./types').PromptComponent} PromptComponent 
 * */


/**@param {string} cmd
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
    case SHELLS.CSH:
      if (checkFile('.cshrc'))
        configFile = join(homeDir, '.cshrc')
    case SHELLS.ZSH:
      if (checkFile('.zshrc'))
        configFile = join(homeDir, '.zshrc')
    case SHELLS.FISH:
      console.log("in FISH")
      if (checkFile(xdg('fish', 'config.fish')))
        configFile = join(homeDir, xdg('fish', 'config.fish'))
    case SHELLS.CMD:
      break;
    case SHELLS.POWERSHELL:
      break;
  }
  return configFile;
}

/**
 * @constructor 
 * @param {Shells} shell
 * @param {PromptComponent[]} components
 * */
export function Prompt(shell, components) {

  /**@type {PromptComponent[]} */
  this.components = components

  /**@type {Shells}*/
  this.shell = shell;
  /**
   * @method
   * @returns {string} 
   * */
  this.toString = function() {
    /**@type {string}*/
    let str = "";
    for (let comp of this.components) {
      str += ANSIColorCode(comp.colors.foreground) + comp.value
    }
    return str
  }
  this.toString.bind(this)

  return this
}


/**
 * @constructor
 * */
export function Environment() {
  /**@type {Shells}*/
  this.shell = getShell()
  /**@type {string}*/
  this.configFile = getShellConfigFile(this.shell);

  /**@readonly {string}*/
  this.promptShell = "# shellconf: [prompt]";

  /**
   * @method set the prompt in a file
   * @param {Prompt} prompt
   * @returns {boolean}
   * */
  this.setPrompt = (prompt) => {
    let lines = readFileSync(this.configFile).toString().split('\n')
    let findShellconfIndex = lines.findIndex(line => line.includes(this.promptShell))
    // check if shellconf already set a prompt
    if (findShellconfIndex > 0) {
      // check if there is more configurations after the prompt (0 means none)
      let ifNextShellconfIndex = lines.slice(findShellconfIndex + 1).findIndex(line => line.includes("shellconf")) || 0;
      // a none-zero value, would mean more lines 
      lines = [...lines.slice(0, findShellconfIndex), this.promptShell, prompt.toString(), ...(ifNextShellconfIndex ? lines.slice(ifNextShellconfIndex) : [])]
    } else {
      // virgin config file, nice
      lines = [...lines, this.promptShell, prompt.toString()]
    }
    writeFileSync(this.configFile, lines.join('\n'));
  }
  this.setPrompt.bind(this)

  return this
}
