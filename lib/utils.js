import { execSync, spawnSync } from "child_process";
import { join } from "path";
import { SHELLS } from "./constants";

/**
 * @typedef {import('./types').Shells} Shells 
 */

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
 * @param {string} program
 * @param {string} filename
 *
 * @returns {string}*/
function xdg(program, filename) {
  return join('.config', program, filename);
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
