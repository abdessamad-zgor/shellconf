function selectPrompt() {
  let promptElements = document.querySelectorAll('.prompt')
  for (let element of promptElements) {
    element.classList.remove('border-sky-500')
  }
  if (e.target) e.target.classList.add('border-sky-500')
}
