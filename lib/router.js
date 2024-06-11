import express from "express"
import { Prompt, withEnv } from "./core.js";
import { prompts } from "./presets.js";
import { SHELLS } from "./constants.js";
import { isActive, selectPrompt, toView } from "./view.js";

let shellconfRouter = express.Router()

shellconfRouter.get("/", (req, res) => {
  res.redirect('/prompt')
});

shellconfRouter.get("/prompt", withEnv((shellEnv) => (req, res) => {
  let shellPrompts = [
    ...prompts.
      filter(p => p.shell == shellEnv.shell)
      .map(p => toView(p))
  ];
  let selectedPrompt = toView(shellEnv.selectedPrompt)

  res.render("prompt", { prompts: shellPrompts, selectedPrompt, selectPrompt, title: "Prompt" })
}));

shellconfRouter.post("/prompt/set", withEnv((shellEnv) => (req, res) => {
  let { name, shell } = req.body

  let chosenPrompt = prompts.find(prm => prm.name == name && prm.shell == shell);

  let prompt = new Prompt(chosenPrompt.shell, chosenPrompt.components, chosenPrompt.name);
  let result = shellEnv.setPrompt(prompt);
  res.send(result ? 'Successfully set!' : 'Set prompt')
}));

shellconfRouter.post("/prompt/select", withEnv((shellEnv) => (req, res) => {
  let { name, shell } = req.body

  let shellPrompts = [
    ...prompts.
      filter(p => p.shell == shellEnv.shell)
      .map(p => toView(p))
  ];
  let chosenPrompt = prompts.find(prm => prm.name == name && prm.shell == shell);

  let prompt = new Prompt(chosenPrompt.shell, chosenPrompt.components, chosenPrompt.name);
  shellEnv.selectedPrompt = prompt
  res.render("prompt", { prompts: shellPrompts, selectedPrompt: toView(prompt), title: "Prompt" })
}));

export { shellconfRouter }
