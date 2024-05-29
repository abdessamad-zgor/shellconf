// this file will eventually be merged with types.d.ts

export type Shells = "SH" | "FISH" | "BASH" | "CSH" | "ZSH" | "PWSH"

export type PromptComponent = {
  value: string,
  colors: {
    background: string;
    foreground: string;
  }
}

export type Prompt = {
  shell: Shells;
  name: string;
  components: PromptComponent[]
}
