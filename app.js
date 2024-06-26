import express from 'express';
import { join } from 'path'
import cors from "cors"

import { shellconfRouter } from './lib/router.js';
import { safe_exec } from './lib/utils.js';


let app = express()

app.set('view engine', 'pug')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/assets', express.static('public/assets'))


app.use("/", shellconfRouter)

export const listen = () => app.listen(4322, () => {
  console.log("Server is listening...")
  let url = 'http://localhost:4322';
  let start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
  safe_exec(start + ' ' + url);
})

listen()
