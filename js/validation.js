// Remove validate class on all element
const elementsWithValidate = document.querySelectorAll('.validate')

elementsWithValidate.forEach((element) => {
  element.setAttribute('novalidate', true)
})

// Listen to events on blue

document.addEventListener('blur', (e) => {
  if(!e.target.form.classList.contains('validate')) return

  let err = e.target.validity
  console.log(err)
}, true)