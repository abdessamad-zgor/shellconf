
enum $Shell {
  BASH,
  ZSH,
  CSH,
  FISH,
  POWERSHELL,
  CMD,
  KSH
}

export type Shell = keyof typeof $Shell

enum $Terminal {
  ALACRITTY,
  ITERM,
  GNOME,
  KITTY,
  WINDOWS
}

export type Terminal = keyof typeof $Terminal

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
    foreground: ANSIBasicColor | ANSI256Color | string,
    background: ANSIBasicColor | ANSI256Color | string
  }
}

export type PromptComponentView = {
  value: string;
  style: { [key: string]: string }
}

export type PromptView = {
  name: string,
  shell: Shell,
  components: PromptComponentView[],
}

export type Theme = {
  name?: string,
  terminal?: Terminal,
  pallette?: {
    bright?: {
      black: string,
      red: string,
      green: string,
      yellow: string,
      blue: string,
      purple: string,
      cyan: string,
      white: string
    },
    dim?: {
      black: string,
      red: string,
      green: string,
      yellow: string,
      blue: string,
      purple: string,
      cyan: string,
      white: string
    },
  },
  colors?: {
    foreground?: string,
    background?: string
  },
  font?: {
    size?: number,
    family?: string
  }
}

export type ThemeView = {
  name?: string,
  terminal?: Terminal,
  pallete: {
    brightBlack: { background: string, color: string },
    brightRed: { background: string, color: string },
    brightGreen: { background: string, color: string },
    brightYellow: { background: string, color: string },
    brightBlue: { background: string, color: string },
    brightPurple: { background: string, color: string },
    brightCyan: { background: string, color: string },
    brightWhite: { background: string, color: string }
    black: { background: string, color: string },
    red: { background: string, color: string },
    green: { background: string, color: string },
    yellow: { background: string, color: string },
    blue: { background: string, color: string },
    purple: { background: string, color: string },
    cyan: { background: string, color: string },
    white: { background: string, color: string }
  },
  font: {
    "font-size": number,
    "font-family": string
  },
  colors: {
    background: string,
    color: string
  }
}
