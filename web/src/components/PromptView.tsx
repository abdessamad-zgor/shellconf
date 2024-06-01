import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { colorsToStyle, usePrompt } from '../hooks/prompt';
import { Prompt } from '../hooks/types';

type PromptViewProps = Omit<Prompt, 'shell'> & { selectPrompt?: MouseEventHandler, setPrompt?: () => void }

function PromptView({ name, components, selectPrompt, setPrompt }: PromptViewProps) {
  const componentStyles = useMemo(() => components.map(c => colorsToStyle({ ...c.colors })), [components])
  const { success, selectedPrompt } = usePrompt()

  useEffect(() => { console.log(componentStyles) }, [])

  if (selectPrompt) {
    return (
      <div className='border px-4 py-12 bg-current/70 rounded relative text-lg font-light bg-black' style={{ border: `0.2em solid ${selectedPrompt && selectedPrompt.name == name ? 'cyan' : 'grey'}` }} onClick={selectPrompt}>
        <p className='absolute top-0 left-0 rounded text-sm font-thin p-2 text-white'>{name}</p>
        {
          components.map((c, i) =>
            <span key={i} style={componentStyles[i]}>{c.value}</span>
          )
        }
      </div>
    )
  }

  if (setPrompt) {
    return (
      <div className='border px-4 py-12 bg-current/70 rounded relative text-lg font-light bg-black w-full'>
        <p className='absolute top-0 left-0 rounded text-sm font-thin p-2 text-white'>{name}</p>
        {
          components.map((c, i) =>
            <span key={i} style={componentStyles[i]}>{c.value}</span>
          )
        }
        <div className='flex justify-end w-full absolute p-2 bottom-0 right-0'>
          <button onClick={setPrompt} className='bg-white/80 px-4 rounded border border-stone-200 text-black'>{success ? "Prompt is set !" : "Set Prompt"}</button>
        </div>
      </div>
    );
  }

  return <></>
}

export default PromptView
