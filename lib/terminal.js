import { checkFile, safe_exec, xdg } from "./utils.js"
import { SHELLS, TERMINALS, chalk } from "./constants.js"
import { getShell } from "./shell.js"
import { homedir, type } from "os"
import { join } from "path"
import { readFileSync } from "fs"
import * as toml from "toml"
import { exit } from "process"

/**@typedef {import('./types.d.ts').Terminal} Terminal*/

function getCurrentProccessParentExecutable() {
  let ppid = safe_exec(`ps -o 'ppid=' -p ${process.ppid}`)
  if (ppid.err) {
    console.log(chalk.red('failed to get current process parent id').toString())
    exit(1)
  }
  console.log(ppid.ok.trim())
  let ppexec = safe_exec(`ps -o 'cmd=' -p ${ppid.ok.trim()}`)
  if (ppexec.err) {
    console.log(chalk.red('failed to get current process parent executable.').toString())
    exit(1)
  }
  return ppexec.ok.trim()
}

/**
 * @returns {Terminal}
 **/
export function getTerminal() {
  /**@type {Terminal}*/
  let terminal;
  if (type() != "Windows_NT") {
    let ppexec = getCurrentProccessParentExecutable()
    console.log(ppexec)
    if (ppexec.includes(TERMINALS.ALACRITTY.toLowerCase())) terminal = TERMINALS.ALACRITTY
    else if (ppexec.includes(TERMINALS.GNOME.toLowerCase())) terminal = TERMINALS.GNOME
    else if (ppexec.includes(TERMINALS.ITERM.toLowerCase())) terminal = TERMINALS.ITERM
    else {
      console.log(chalk.red("your terminal emulator is no supported, consider adding support.").toString())
      exit(1)
    }
  } else terminal = TERMINALS.WINDOWS
  console.log(chalk.bgWhite.red("Detected: " + terminal.trim()).toString())
  return terminal
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
      if (checkFile(xdg("alacritty", "alacritty.toml")))
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
