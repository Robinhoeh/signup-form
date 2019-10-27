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

  let validity = field.validity
})

// Listen to events on blur
document.addEventListener('blur', (e) => {
  if(!e.target.form.classList.contains('validate')) return

  let error = hasError(e.target)

  // if valid return null
  if (validity.valid) return

  // if field is required and empty
  if(validity.valueMissing) return 'Please fill out this field'

  // if url or email is not the correct type
if(validity.typeMismatch) {

  if (field.type === 'email') return 'Please enter a email'

  if (field.type === 'url') return 'Please enter a url'

}



// If too shorts
if(validity.tooShort) return 'Please lengthen this text'

// If too long
if(validty.tooLong) return 'Please shorten text'

// if number isnt a number
if(validity.badInput) return 'Please enter a number'

// if a number value doesn't match the step interval
if(validity.stepMismatch) return 'Please select a valid value'

// if a number field is over the max
if(validty.rangeOverflow) return 'Please select a smaller value'

// if a number field is under the minimum
if(validtiy.rangeUnderflow) return 'Please select a larger value'

// if pattern doesn't match
if(validity.patternMismatch) return 'Please match the requested format'

// generic catch all
return 'The value you entered is invalid'

}, true)