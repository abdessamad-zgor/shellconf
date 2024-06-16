import { ANSIColorCode } from "./colors.js";
import { SHELLS, ANSIBasicColor } from "./constants.js";
import { Prompt } from "./core.js";

/**@typedef {import(./types.d.ts).Theme[]} Theme*/

/**@type {(Prompt) []}*/
export const prompts = [
  {
    name: "Simple py",
    shell: SHELLS.FISH,
    components: [
      { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
      { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
      { value: "string replace -- $HOME '~' (pwd)", colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } },
      { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }
    ]
  },
  {
    name: "Simple py",
    shell: SHELLS.ZSH,
    components: [
      { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
      { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
      { value: "${PWD/#$HOME/~}", colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } },
      { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }
    ]
  },
  {
    name: "Simple py",
    shell: SHELLS.BASH,
    components: [
      { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
      { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
      { value: `echo $(echo $PWD | sed "s|^ $HOME | ~| ")`, colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } },
      { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }
    ]
  },
  {
    name: "Hackerman",
    shell: SHELLS.FISH,
    components: [
      { value: 'date "+%I::%M %p"', colors: { foreground: ANSIBasicColor.FG_BLACK } },
      { value: String.raw`git branch 2>/dev/null | sed -n -e 's/^\* \(.*\)/\(\1\)/p'`, colors: { foreground: ANSIBasicColor.FG_CYAN } },
      { value: ">", colors: { foreground: ANSIBasicColor.FG_GREEN } },
      { value: "string replace -- $HOME '~' (pwd) ", colors: { foreground: ANSIBasicColor.FG_BLUE } },
      { value: "#", colors: { foreground: ANSIBasicColor.FG_WHITE } }
    ]
  }
]

/**@type {Theme[]}*/
export const themes = [
  {
    name: "Aurelia",
    terminal: "alacritty",
    pallete: {
      bright: {
        black: "#797979",
        red: "#EB2A88",
        green: "#1AD69C",
        yellow: "#e9ad95",
        blue: "#9CDCFE",
        purple: "#975EAB",
        cyan: "#2BC4E2",
        white: "#EAEAEA",
      },
      dim: {
        black: "#000000",
        red: "#E92888",
        green: "#4EC9B0",
        yellow: "#CE9178",
        blue: "#579BD5",
        purple: "#714896",
        cyan: "#00B6D6",
        white: "#EAEAEA"
      }
    },
    font: {
      size: 14,
      family: 'CaskaydiaCove Nerd Font'
    },
    colors: {
      foreground: "#EA549F",
      background: "#1a1a1a"
    }
  },
  {
    name: "Aurelia",
    terminal: "windows",
    pallete: {
      bright: {
        black: "#797979",
        red: "#EB2A88",
        green: "#1AD69C",
        yellow: "#e9ad95",
        blue: "#9CDCFE",
        purple: "#975EAB",
        cyan: "#2BC4E2",
        white: "#EAEAEA",
      },
      dim: {
        black: "#000000",
        red: "#E92888",
        green: "#4EC9B0",
        yellow: "#CE9178",
        blue: "#579BD5",
        purple: "#714896",
        cyan: "#00B6D6",
        white: "#EAEAEA"
      }
    },
    font: {
      size: 14,
      family: 'CaskaydiaCove Nerd Font'
    },
    colors: {
      foreground: "#EA549F",
      background: "#1a1a1a"
    }
  },
  {
    name: "Aurelia",
    terminal: "gnome",
    pallete: {
      bright: {
        black: "#797979",
        red: "#EB2A88",
        green: "#1AD69C",
        yellow: "#e9ad95",
        blue: "#9CDCFE",
        purple: "#975EAB",
        cyan: "#2BC4E2",
        white: "#EAEAEA",
      },
      dim: {
        black: "#000000",
        red: "#E92888",
        green: "#4EC9B0",
        yellow: "#CE9178",
        blue: "#579BD5",
        purple: "#714896",
        cyan: "#00B6D6",
        white: "#EAEAEA"
      }
    },
    font: {
      size: 14,
      family: 'CaskaydiaCove Nerd Font'
    },
    colors: {
      foreground: "#EA549F",
      background: "#1a1a1a"
    }
  }
]
