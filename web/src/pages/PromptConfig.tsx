import React from 'react'
import PromptView from '../components/PromptView'
import { Prompt } from '../hooks/types'
import { usePrompt } from '../hooks/prompt'

function PromptConfig() {
  let { prompts, error, success, selectedPrompt, selectPrompt } = usePrompt()
  return (
    <div className='flex flex-wrap p-4'>
      {
        prompts.length == 0 ?
          <p className='font-thin text-white'>there aren't any prompts for this shells consider adding your own.</p>
          :
          prompts.map(p => <PromptView prompt={p} selectPrompt={selectPrompt(p)} />)
      }
    </div>
  )
}

export default PromptConfig
