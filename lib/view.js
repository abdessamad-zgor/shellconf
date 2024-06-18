import { toCssStyle } from './colors.js'
import { eval_comp } from './utils.js'

/**@typedef {import('./core').Prompt} Prompt**/
/**@typedef {import('./types').Theme} Theme**/
/**@typedef {import('./types').ThemeView} ThemeView**/
/**@typedef {import('./types').PromptView} PromptView**/

/**
 * @param {Prompt} prompt 
 * @returns {PromptView}
 * */
export function toPromptView(prompt) {
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

/**@param {string} background*/
function colorBasedOnBackground(background) {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  background = background.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(background);
  let rgb = [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ]
  const brightness = Math.round(((parseInt(rgb[0]) * 299) +
    (parseInt(rgb[1]) * 587) +
    (parseInt(rgb[2]) * 114)) / 1000);
  const color = (brightness > 125) ? 'black' : 'white';
  return color
}

/**
 * @param {Theme} theme
 * @returns {ThemeView}
 * */
export function toThemeView(theme) {
  console.log(theme)
  return {
    name: theme?.name,
    terminal: theme?.terminal,
    palette: Object
      .keys(theme.palette)
      .map(
        p =>
          Object.keys(theme.palette[p]).reduce((acc, cur) => {
            let key = (p == "bright" ? "Bright" : "") + cur.charAt(0).toUpperCase() + cur.slice(1)
            return [
              ...acc, { name: key, style: { background: theme.palette[p][cur], color: colorBasedOnBackground(theme.palette[p][cur]) } }
            ]
          }, [])
      ).reduce((acc, cur) => [...acc, ...cur], [])
    ,
    font: {
      "font-size": theme.font.size,
      "font-family": `'${theme.font.family}', sans-serif`
    },
    colors: {
      background: theme.colors.background,
      color: theme.colors.foreground
    }
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
