import express from "express"
import { withEnv } from "./core";
import { prompts } from './presets.js'
import { SHELLS } from "./constants.js";

let shellconfRouter = express.Router()

shellconfRouter.get("/prompt", withEnv((shellEnv) => (req, res) => {
  let shellPrompts = [...prompts.filter(p => p.prompt.shell == shellEnv.shell)];
  res.status(200).json(shellPrompts)
}));

export { shellconfRouter }
