import React from 'react'
import PromptView from '../components/PromptView'
import { Prompt } from '../hooks/types'
import { usePrompt } from '../hooks/prompt'

function PromptConfig() {
  let { prompts, error, success, selectedPrompt, selectPrompt, setPrompt } = usePrompt()
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-full p-4'>
        {selectedPrompt ? <PromptView name={selectedPrompt.name} components={selectedPrompt.components} setPrompt={setPrompt} /> : <></>}
      </div>
      <div className='flex flex-wrap p-4'>
        {
          prompts.length == 0 ?
            <p className='font-thin text-white'>there aren't any prompts for this shells consider adding your own.</p>
            :
            prompts.map((p, i) => <PromptView key={i} name={p.name} components={p.components} selectPrompt={selectPrompt(p)} />)
        }
      </div>
    </div>
  )
}

export default PromptConfig
