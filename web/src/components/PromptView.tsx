import React, { MouseEventHandler } from 'react';
import { colorsToStyle, usePrompt } from '../hooks/prompt';
import { Prompt } from '../hooks/types';

function PromptView({ prompt, selectPrompt }: { prompt: Prompt, selectPrompt: MouseEventHandler }) {
  return (
    <div className='border p-4 bg-current/70 rounded relative'>
      <p className='absolute top-0 left-0 rounded text-sm font-thin'>{prompt.name}</p>
      {
        prompt.components.map((c) =>
          <span style={colorsToStyle(c.colors)}>{c.value}</span>
        )
      }
    </div>
  )
}

export default PromptView
