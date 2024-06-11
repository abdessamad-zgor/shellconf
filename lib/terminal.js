import { checkFile, safe_exec } from "./utils.js"
import { SHELLS, TERMINALS, chalk } from "./constants.js"
import { getShell } from "./shell.js"
import { homedir, type } from "os"
import { join } from "path"

/**
 * @returns {import('./types').Terminals}
 **/
export function getTerminal() {
  let shellname = getShell()
  let current_ps = "$$"
  if (!type() == "Windows_NT") {
    if (shellname == SHELLS.FISH.toLowerCase()) current_ps = "$fish_pid"
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
 * @return {string}
 * **/
export function getTerminalConfigFile() {
  let terminal = getTerminal()
  /**@type {string}**/
  let terminalConfig;
  switch (terminal) {
    case TERMINALS.WINDOWS:
      if (checkFile(String.raw`\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`))
        terminalConfig = join(homedir(), String.raw`\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState\settings.json`)
      break;
    case TERMINALS.GNOME:

      break;
    case TERMINALS.ALACRITTY:

      break;
    case TERMINALS.ITERM:

      break;

    default:
      break;
  }
  return terminalConfig;
}
