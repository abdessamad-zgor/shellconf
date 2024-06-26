import { readFileSync, writeFileSync } from 'fs';
import { ANSIColorCode, toCssStyle } from './colors.js';
import { getShellConfigFile, getShell } from './shell.js';
import { eval_comp, format_comp, shell_prompt } from './utils.js';
import { chalk } from './constants.js';
import { prompts } from './presets.js';
import { getTerminal, getTerminalConfigFile } from './terminal.js';

/**
 * @typedef {import('./types').Shell} Shell 
 * @typedef {import('./types').PromptComponent} PromptComponent 
 * */

/**@type {Environment}*/
var shellEnv = new Environment();

/**
 * @constructor 
 * @param {Shell} shell
 * @param {PromptComponent[]} components
 * @param {string|undefined} name
 * */
export function Prompt(shell, components, name) {
  /**@type {string|undefined}*/
  this.name = name

  /**@type {PromptComponent[]} */
  this.components = components

  /**@type {Shell}*/
  this.shell = shell;
  /**
   * @method
   * @returns {string} 
   * */
  this.toString = function() {
    /**@type {string}*/
    let str = "";
    for (let comp of this.components) {
      str += ANSIColorCode(comp.colors.foreground, comp.colors.background) + format_comp(this.shell, comp.value) + ANSIColorCode()
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
  /**@type {Shell}*/
  this.shell = getShell();
  /**@type {string}*/
  this.shellFile = getShellConfigFile(this.shell);
  /**@type {Terminal}*/
  this.terminal = getTerminal();
  /**@type {string}*/
  this.terminalFile = getTerminalConfigFile(this.terminal);

  /**@readonly {string}*/
  this.promptShell = "# shellconf: [prompt]";

  /**@type {Prompt}**/
  this.selectedPrompt = prompts[0]

  /**
   * @method set the prompt in the configuration file
   * @param {Prompt} prompt
   * @returns {boolean}
   * */
  this.setPrompt = (prompt) => {
    if (prompt.shell != this.shell) {
      console.log(chalk.red("[ERROR]::: prompt shell type " + prompt.shell + " those not match environment shell " + this.shell))
      return false;
    }
    let lines = readFileSync(this.shellFile).toString().split('\n')
    let findShellconfIndex = lines.findIndex(line => line.includes(this.promptShell))
    // check if shellconf already set a prompt
    if (findShellconfIndex > 0) {
      // check if there is more configurations after the prompt (0 means none)
      let ifNextShellconfIndex = lines.slice(findShellconfIndex + 1).findIndex(line => line.includes("shellconf"));
      // a none-zero value, would mean more lines 
      lines = [...lines.slice(0, findShellconfIndex), this.promptShell, prompt.toString(), ...(ifNextShellconfIndex > 0 ? lines.slice(ifNextShellconfIndex) : [])]
    } else {
      // virgin config file, nice
      lines = [...lines, this.promptShell, prompt.toString()]
    }
    writeFileSync(this.shellFile, lines.join('\n'));
    return true
  }
  this.setPrompt.bind(this)

  /**
   * @method set the theme in the configuration file
   * @param {Theme} theme
   * @returns {boolean}
   * */
  this.setTheme = function(theme) {
    return true
  }
  this.setTheme.bind(this)

  return this
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
