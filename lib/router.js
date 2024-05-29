import express from "express"
import { Prompt, withEnv, toView } from "./core.js";
import { prompts } from "./presets.js";
import { SHELLS } from "./constants.js";

let shellconfRouter = express.Router()

shellconfRouter.get("/init", (req, res) => { });

shellconfRouter.get("/prompt", withEnv((shellEnv) => (req, res) => {
  let shellPrompts = [
    ...prompts.
      filter(p => p.shell == shellEnv.shell)
      .map(p => toView(p))
  ];
  console.log("prompts: ", shellPrompts);

  res.status(200).json(shellPrompts)
}));

shellconfRouter.post("/prompt/set", withEnv((shellEnv) => (req, res) => {
  let { name, shell, components } = req.body
  console.log("prompt name: ", name, " shell: ", shell)
  let prompt = new Prompt(shell, components, name);
  let result = shellEnv.setPrompt(prompt);
  res.status(200).json({ result })
}));

export { shellconfRouter }
