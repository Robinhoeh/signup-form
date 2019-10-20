// Remove validate class on all element
const elementsWithValidate = document.querySelectorAll('.validate')

elementsWithValidate.forEach((element) => {
  element.setAttribute('novalidate', true)
})

// Validate the field
const hasError = ((field) => {
// Don't validate submits, buttons, file and reset inputs, and disabled fields
  if(field.disabled || field.type === 'file' || field.type ===
  'reset' || field.type === 'button' || field.type === 'submit') return

  const validity = field.validity
})

// Listen to events on blur
document.addEventListener('blur', (e) => {
  if(!e.target.form.classList.contains('validate')) return

  let error = hasError(e.target)

}, true)