import { checkFile, safe_exec, xdg } from "./utils.js"
import { SHELLS, TERMINALS, chalk } from "./constants.js"
import { getShell } from "./shell.js"
import { homedir, type } from "os"
import { join } from "path"
import { readFileSync } from "fs"
import * as toml from "toml"

/**@typedef {import('./types.d.ts').Terminal} Terminal*/

/**
 * @returns {Terminal}
 **/
export function getTerminal() {
  let shellname = getShell()
  let current_ps = "$$"
  if (!type() == "Windows_NT") {
    if (shellname == SHELLS.FISH) current_ps = "$fish_pid"
    let command = (current_ps) => `ps -o 'cmd=' -p $(ps -o 'ppid=' -p ${current_ps})`
    let { ok, err } = safe_exec(command(current_ps))
    if (err) {
      console.log(chalk.red("failed to get current terminal emulator."))
    }
    if (ok.includes(TERMINALS.ALACRITTY.toLowerCase())) return TERMINALS.ALACRITTY
    else if (ok.includes(TERMINALS.GNOME.toLowerCase())) return TERMINALS.GNOME
    else if (ok.includes(TERMINALS.ITERM.toLowerCase())) return TERMINALS.ITERM
  } else return TERMINALS.WINDOWS
}

/**
 * @param {Terminal} terminal
 *
 * @return {string}
 * **/
export function getTerminalConfigFile(terminal) {
  /**@type {string}**/
  let terminalConfig;
  switch (terminal) {
    case TERMINALS.WINDOWS:
      if (checkFile(String.raw`\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`))
        terminalConfig = join(homedir(), String.raw`\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`)
      break;
    case TERMINALS.GNOME:
      let { ok, err } = safe_exec("dconf dump /conf/gnome/terminal/>~/gnome.properties")
      if (ok && err == null)
        terminalConfig = join(homedir(), "gnome.properties")
      break;
    case TERMINALS.ALACRITTY:
      if (checkFile(".alacritty.toml"))
        terminalConfig = join(homedir(), ".alacritty.toml")
      if (checkFile(xdg("alacritty.toml")))
        terminalConfig = join(homedir(), "alacritty.toml")
      break;
    case TERMINALS.ITERM:
      break;
    default:
      break;
  }
  return terminalConfig;
}

/**@param {string} file**/
export function parseGvariant(file) {
  let content = readFileSync(file, { encoding: 'utf8' })
  let lines = content.split('\n')
  /**@type {number[]}**/
  let parsableLines;
  /**@type {{[key: string]: any}}**/
  let parsedValues = {}
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].includes("=")) continue;
    parsableLines.push(i)
    let pair = line.split("=");
    parsedValues[pair[0]] = JSON.parse(pair[1]);
  }
  return parsedValues;
}

/**@param {string} file**/
export function parseToml(file) {
  let content = readFileSync(file, { encoding: 'utf8' })
  return toml.parse(content)
}
