enum $Shells {
  BASH,
  ZSH,
  CSH,
  FISH,
  POWERSHELL,
  CMD,
  KSH
}

export type Shells = keyof typeof $Shells

export enum ANSIBasicColor {
  FG_BLACK = 30,
  FG_RED,
  FG_GREEN,
  FG_YELLOW,
  FG_BLUE,
  FG_PURPLE,
  FG_CYAN,
  FG_WHITE,
  BG_BLACK = 40,
  BG_RED,
  BG_GREEN,
  BG_YELLOW,
  BG_BLUE,
  BG_PURPLE,
  BG_CYAN,
  BG_WHITE,
}

/**Single value RGB code 0-255*/
export type ANSI256Color = ["BG" | "FG", number]

export type PromptComponent = {
  value: string;
  colors: {
    foreground: ANSIBasicColor | ANSI256Color,
    background: ANSIBasicColor | ANSI256Color
  }
}
