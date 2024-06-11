import { toCssStyle } from './colors.js'
import { eval_comp } from './utils.js'

/**@typedef {import('./core').Prompt} Prompt**/
/**@typedef {import('./types').PromptView} PromptView**/

/**
 * @param {Prompt} prompt 
 * @returns {PromptView}
 * */
export function toView(prompt) {
  return {
    name: prompt.name,
    shell: prompt.shell,
    components: prompt.components.map(
      (comp, i) =>
      ({
        value: eval_comp(prompt.shell, comp.value),
        style: toCssStyle(comp.colors)
      })
    )
  }
}


/**@param {MouseEvent} e**/
export function selectPrompt(e) {
  let promptElements = document.querySelectorAll('.prompt')
  for (let element of promptElements) {
    element.classList.remove('border-sky-500')
  }
  if (e.target) e.target.classList.add('border-sky-500')
}

export const isActive = (path) => window && window.location.pathname.includes(path)