import express from 'express';
import { join } from 'path'
import cors from "cors"

import { shellconfRouter } from './lib/router.js';


let app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
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
