import { ANSIColorCode } from "./colors.js";
import { SHELLS, ANSIBasicColor } from "./constants.js";
import { Prompt } from "./core.js";

/**@type {(Prompt) []}*/
export const prompts = [
  {
    name: "simple py",
    shell: SHELLS.FISH,
    components: [{ value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } }, { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } }, { value: "string replace -- $HOME '~' (pwd)", colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } }, { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }]
  },
  {
    name: "simple py",
    shell: SHELLS.ZSH,
    components: [{ value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } }, { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } }, { value: "${PWD/#$HOME/~}", colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } }, { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }]
  },
  {
    name: "simple py",
    shell: SHELLS.BASH,
    components: [{ value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } }, { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } }, { value: `echo $(echo $PWD | sed "s|^ $HOME | ~| ")`, colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } }, { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }]
  }
]
