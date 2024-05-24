import { ANSIColorCode } from "./colors.js";
import { SHELLS, ANSIBasicColor } from "./constants.js";
import { Prompt } from "./shell.js";

export let zbPrompt = new Prompt(SHELLS.FISH,
  [
    { value: "$USER", colors: { foreground: ANSIBasicColor.FG_CYAN } },
    { value: " at ", colors: { foreground: ANSIBasicColor.FG_GREEN } },
    { value: "pwd", colors: { foreground: ANSIBasicColor.FG_RED, background: ANSIBasicColor.BG_BLUE } },
    { value: " $", colors: { foreground: ANSIBasicColor.FG_BLUE } }
  ]
)
