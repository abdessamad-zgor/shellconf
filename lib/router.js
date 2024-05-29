import express from "express"
import { Prompt, withEnv } from "./core.js";
import { prompts } from "./presets.js";
import { withCssColors } from "./colors.js";
import { SHELLS } from "./constants.js";

let shellconfRouter = express.Router()

shellconfRouter.get("/init", (req, res) => { });

shellconfRouter.get("/prompt", withEnv((shellEnv) => (req, res) => {
  let shellPrompts = [
    ...prompts.
      filter(p => p.shell == shellEnv.shell)
      .map(p => withCssColors(p))
  ];
  res.status(200).json(shellPrompts)
}));

shellconfRouter.post("/prompt/set", withEnv((shellEnv) => (req, res) => {
  let prompt = new Prompt(...req.body);
  let result = shellEnv.setPrompt(prompt);
  res.status(200).json({ result })
}));

export { shellconfRouter }
