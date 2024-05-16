
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
