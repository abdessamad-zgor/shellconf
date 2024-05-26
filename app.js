import express from 'express';
import { Environment, InitShellEnv } from './lib/core.js';
import { join } from 'path'

InitShellEnv()

let app = express()
app.use(express.json())

app.use('/assets', express.static('public/assets'))

app.use("/shellconf", shellconfRouter)

app.use("/*", (req, res) => {
  res.sendFile('public/index.html')
});

export const listen = () => app.listen(4322, () => {
  console.log("Server is listening...")
})

listen()
