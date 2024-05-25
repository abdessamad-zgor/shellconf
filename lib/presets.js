import { ANSIColorCode } from "./colors.js";
import { SHELLS, ANSIBasicColor } from "./constants.js";
import { Prompt } from "./core.js";

export let zbPrompt = new Prompt(SHELLS.FISH,
  [
    { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
    { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
    { value: "string replace -- $HOME '~' (pwd)", colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } },
    { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }
  ]
)

export let zshPrompt = new Prompt(SHELLS.ZSH, [
  { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
  { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
  { value: "${PWD/#$HOME/~}", colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } },
  { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }
])

export let bashPrompt = new Prompt(SHELLS.BASH, [
  { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
  { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
  { value: `echo $(echo $PWD | sed "s|^ $HOME | ~| ")`, colors: { foreground: ANSIBasicColor.FG_WHITE, background: ANSIBasicColor.BG_BLACK } },
  { value: " > ", colors: { foreground: ANSIBasicColor.FG_BLUE } }
])
