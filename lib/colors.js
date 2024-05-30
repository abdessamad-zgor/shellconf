import { chalk, ANSIBasicColor } from './constants.js'
import { exec } from 'child_process'
import { exit } from 'process';
import { join } from 'path';
import { version } from 'os';
import { colors } from 'chalk';
import { Prompt } from './core.js';

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
 * @param {import('./types').ANSIBasicColor|import('./types').ANSI256Color|undefined} foreground
 * @param {import('./types').ANSIBasicColor|import('./types').ANSI256Color|undefined} background
 * @returns {string} - if called with any colors it will return it's ANSI color code if called empty, it returs ansi reset code
 * */
export function ANSIColorCode(foreground, background) {
  /**@type {string}*/
  let color = "\x1b[00m";
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


const AnsiColorsToCSS = Object.keys(ANSIBasicColor).reduce((acc, cur) => {
  let colorKey = cur.split('_')
  if (cur.toLowerCase().includes("white")) {
    if (colorKey[0] == "BG") acc[cur] = "silver"
    else acc[cur] = "whitesmoke"
  } else if (cur.toLowerCase().includes("black")) {
    if (colorKey[0] == "BG") acc[cur] = "dimgray"
    else acc[cur] = "black"
  } else {
    colorKey[0] = colorKey[0] == "BG" ? 'light' : "";
    acc[cur] = colorKey.join("").toLowerCase()
  }
  return acc
}, {});

const reversedAnsiColors = Object.keys(AnsiColorsToCSS).reduce(
  (acc, cur) =>
    acc.set(ANSIBasicColor[cur], AnsiColorsToCSS[cur]), new Map()
);


/**
 * @param {Prompt['components'][0]['colors']} colors
 * return is had to 
 * */
export function toCssColors(colors) {
  console.log(AnsiColorsToCSS);
  console.log(reversedAnsiColors);
  return {
    background: reversedAnsiColors.get(colors.background),
    foreground: reversedAnsiColors.get(colors.foreground)
  }
}
