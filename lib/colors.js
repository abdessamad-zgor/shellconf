import { ANSIBasicColor } from './types';
import { chalk } from './constants'
import { exec } from 'child_process'
import { exit } from 'process';
import { join } from 'path';
import { version } from 'os';


/**
 * @returns {boolean}
 * */
function check256ColorSupport() {
  // Assuming only 16-bit color support for Windows
  if (version() == "Windows_NT") return false;
  /**@type {boolean}*/
  let result;
  let root_dir = import.meta.dirname
  let colorsScriptPath = join(root_dir, 'scripts/colors.py')
  exec(`chmod +x ${colorsScriptPath}`, (err, stdout, stderr) => {
    if (err) {
      console.log(chalk.red("failed to get 256color support"));
      exit(1);
    }
    exec(`./${colorsScriptPath}`, (err, stdout, stderr) => {
      if (err) {
        console.log(chalk.red('failed to get 256color support'))
        exit(1);
      }

      if (stdout == 'TRUE') result = true;
      else result == false;
    })
  });
  return result
}
/**
 * @param {import('./types').ANSIBasicColor|import('./types').ANSI256Color} foreground
 * @param {import('./types').ANSIBasicColor|import('./types').ANSI256Color} background
 * */
export function ANSIColorCode(foreground, background) {
  /**@type {string}*/
  let color;
  if (foreground) {
    color = `\x1b[${is256(foreground) ? `38;5;${foreground[1]}` : foreground}m`
  }
  if (background) {
    if (!foreground) {
      color = `\x1b[${is256(background) ? `38;5;${background[1]}` : background}m`
    }
    // insert background after foreboumnd and befor 'm'
    color = color.slice(0, color.indexOf('m')) + `;${is256(background) ? `38;5;${background[1]}` : background}m`
  }
  return color;
}

/**
 * @param {*} rgb 
 * @returns {boolean}*/
export function is256(rgb) {
  return typeof rgb == 'object' && (rgb[0] == "BG" || rgb[0] == "FG") && typeof rgb[1] == 'number';
}
