import { type } from 'os'
import { exec } from 'child_process'
import { SHELLS, chalk } from './constants'
import { exit } from 'process'

/**
 * @typedef {import('./types')} Shells 
 * */

/**
 * return the current shell of the system
 * @returns {Shells} 
 */
function checkShell() {
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
