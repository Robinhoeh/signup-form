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

  if (validity.valueMissing) return 'Please fill out this field'

  // if url or email is not the correct type
  if (validity.typeMismatch) {

    if (field.type === 'email') return 'Please enter a email'

    if (field.type === 'url') return 'Please enter a url'

  }

  // If too short
  if (validity.tooShort)
    return 'Please lengthen this text to ' + field.length.getAttribute('minLength') + 'characters or more. You are currently using ' + field.value.length + 'characters.'

  // If too long
  if (validty.tooLong)
    return 'Please shorten this text to ' + field.length.getAtrribute('maxLength') + 'characters or less. You are currently using ' + field.value.length + 'characters.'

  // if number isnt a number
  if (validity.badInput) return 'Please enter a number'

  // if a number value doesn't match the step interval
  if (validity.stepMismatch) return 'Please select a valid value'

  // if a number field is over the max
  if (validty.rangeOverflow)
    return 'Please select a number that is no more than ' + field.getAttribute('max') + '.'

  // if a number field is under the minimum
  if (validtiy.rangeUnderflow)
    return 'Please select number that is no less than ' + field.getAtrribute('min') + '.'

  // if pattern doesn't match
  if (validity.patternMismatch) {

    if (field.hasAttribute('title')) return field.getAttribute('title')

    // Otheriwse
    return 'Please match the reuested form'
  }

  // generic catch all
  return 'The value you entered for thie field is invalid'

}, true)

// Show the error msg
const showError = (field, err) => {
	// show the msg...
	field.classList.add(error)

	const fieldId = field.id || field.name
	if(!id) return

	// check if err msg exists
	// if not, create one

	//We'll also use the field ID to create a unique ID for the message so we can find it again later (falling back to the field name in case there's no ID).

	const message = field.form.querySelector('.error-message#error-for-' + id)
	if(!message) {
		message = document.createElement('div')
		message.className = 'error-message'
		message.id = 'error-for-' + id
		field.parentNode.insertBefore(message, field.nextSibling)
	}

	// update err msg
	message.innerHTML = err

	// show err msg
	message.style.display = 'block'
	message.style.visibility = 'visible'
}


// Listen to events on blur
document.addEventListener('blur', (e) => {
  if(!e.target.form.classList.contains('validate')) return

  let error = hasError(e.target)

	// If err show err
	if(err) {
		showError(e.target, err)
	}

}, true)
