import { readFileSync, writeFileSync } from 'fs';
import { ANSIColorCode } from './colors.js';
import { getShellConfigFile, getShell, evalComp, shell_prompt } from './shell.js';
import { chalk } from './constants.js';

/**
 * @typedef {import('./types').Shells} Shells 
 * @typedef {import('./types').PromptComponent} PromptComponent 
 * */

/**@type {Environment}*/
var shellEnv;

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
      str += ANSIColorCode(comp.colors.foreground, comp.colors.background) + evalComp(this.shell, comp.value) + ANSIColorCode()
    }
    return shell_prompt(this.shell, str)
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
    if (prompt.shell != this.shell) {
      console.log(chalk.red("[ERROR]::: prompt shell type " + prompt.shell + " those not match environment shell " + this.shell))
      return false;
    }
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
    return true
  }
  this.setPrompt.bind(this)

  return this
}

/**
 * initialise the current shell environemnt
 * */
export function InitShellEnv() {
  shellEnv = new Environment()
}

/**
 * give controllers access to the `shellEnv` variable
 *
 * @param {(e: Environment)=>(req: import('express').Request, res: import('express').Response)=>void} fn
 * @returns {(req: import('express').Request, res: import('express').Response)=>void}
 * */
export function withEnv(fn) {
  return fn(shellEnv)
}