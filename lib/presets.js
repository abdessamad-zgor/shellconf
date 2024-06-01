import { ANSIColorCode } from "./colors.js";
import { SHELLS, ANSIBasicColor } from "./constants.js";
import { Prompt } from "./core.js";

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
      { value: 'date "+%I::%M %p"', colors: { foreground: ANSIBasicColor.FG_WHITE } },
      { value: String.raw`git branch 2>/dev/null | sed -n -e 's/^\* \(.*\)/\(\1\)/p'`, colors: { foreground: ANSIBasicColor.FG_YELLOW } },
      { value: ">", colors: { foreground: ANSIBasicColor.FG_GREEN } },
      { value: "string replace -- $HOME '~' (pwd) ", colors: { foreground: ANSIBasicColor.FG_BLUE } },
      { value: "#", colors: { foreground: ANSIBasicColor.FG_WHITE } }
    ]
  }
]
