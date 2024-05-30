import { CSSProperties, useEffect, useState } from "react";
import { Prompt, PromptComponent } from "./types"

export const usePrompt = () => {
  let [prompts, setPrompts] = useState<Prompt[]>([])
  let [selectedPrompt, setSelectedPrompt] = useState<Prompt>()
  let [error, setError] = useState<{ [key: string]: Error }>({})
  let [success, setSuccess] = useState<boolean>(null)

  useEffect(() => {
    let getPrompts = async () => {
      try {
        let res = await fetch("http://localhost:4322/shellconf/prompt")
        let data = await res.json()
        console.log(data);
        return data;
      } catch (error) {
        throw error
      }
    }

    getPrompts().then(res => {
      setPrompts(res as Prompt[]);
      setError(errS => {
        let { getPrompts, ...errRest } = errS
        return errRest
      })
      setSelectedPrompt(res[0] as Prompt)
    }).catch(err => setError(errS => ({ ...errS, getPrompts: err })))
  }, [])


  let selectPrompt = (prompt: Prompt) => {
    return () => setSelectedPrompt(prompt);
  }

  let setPrompt = () => {
    let setPrompt = async () => {
      if (selectedPrompt) {
        console.log(selectedPrompt)
        try {
          let res = await fetch("http://localhost:4322/shellconf/prompt/set", {
            headers: {
              'Content-type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(selectedPrompt)
          });
          return await res.json()
        } catch (error) {
          throw error
        }
      }
      return
    }

    setPrompt().then(res => {
      setSuccess(res == undefined ? false : res.result)
      setError(errS => {
        let { setPrompt, ...errRest } = errS
        return errRest
      })
    }).catch(err => setError(errS => ({ ...errS, setPrompts: err })))
  }

  return { error, success, prompts, selectedPrompt, selectPrompt, setPrompt }
}

export function colorsToStyle(colors: PromptComponent['colors']): CSSProperties {
  return { backgroundColor: colors.background, color: colors.foreground }
}
