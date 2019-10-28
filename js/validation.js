// Remove validate class on all element
const elementsWithValidate = document.querySelectorAll('.validate')

elementsWithValidate.forEach((element) => {
  element.setAttribute('novalidate', true)
})

// Validate the field
const hasError = function(field) {
// Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (field.disabled || field.type === 'file' || field.type ===
  'reset' || field.type === 'button' || field.type === 'submit') return

  let validity = field.validity

  // If valid, return null
  if (validity.valid) return;

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
  if (validity.tooLong)
    return 'Please shorten this text to ' + field.length.getAtrribute('maxLength') + 'characters or less. You are currently using ' + field.value.length + 'characters.'

  // if number isnt a number
  if (validity.badInput) return 'Please enter a number'

  // if a number value doesn't match the step interval
  if (validity.stepMismatch) return 'Please select a valid value'

  // if a number field is over the max
  if (validity.rangeOverflow)
    return 'Please select a number that is no more than ' + field.getAttribute('max') + '.'

  // if a number field is under the minimum
  if (validity.rangeUnderflow)
    return 'Please select number that is no less than ' + field.getAtrribute('min') + '.'

  // if pattern doesn't match
  if (validity.patternMismatch) {

    if (field.hasAttribute('title')) return field.getAttribute('title')

    // Otheriwse
    return 'Please match the reuested form'
  }

  // generic catch all
	return 'The value you entered for thie field is invalid'

}

// Show the error msg
const showError = function(field, error) {

  field.classList.add('error')

  if(field.type === 'radio' && field.name) {
    let group = document.getElementsByName(field.name)
    if(group.length > 0) {
      group.forEach((groupItem) => {
        if(groupItem.form !== field.form)
        groupItem.classList.add('error')
      })
      field = group[group.length - 1]
    }
  }

	let fieldId = field.id || field.name
	if(!fieldId) return

	// check if err msg exists
	// if not, create one

	//We'll also use the field ID to create a unique ID for the message so we can find it again later (falling back to the field name in case there's no ID).

	let message = field.form.querySelector('.error-message#error-for-' + fieldId)
	if(!message) {
		message = document.createElement('div')
		message.className = 'error-message'
		message.id = 'error-for-' + fieldId
    field.parentNode.insertBefore(message, field.nextSibling)

    let label;
    if(field.type === 'radio' || field.type === 'checkbox') {
      label = field.form.querySelector('label[for="' + fieldId + '"]') ||
      field.parentNode
      if (label) {
        label.parentNode.insertBefore(message, label.nextSibling)
      }
    }

  // Otherwise, insert it after the field
  if (!label) {
    field.parentNode.insertBefore(message, field.nextSibling);
  }
}

  // Add aria-describeby role to the input field
  field.setAttribute('aria-describedby', 'error-for-' + fieldId)

	// update err msg
	message.innerHTML = error

	// show err msg
	message.style.display = 'block'
	message.style.visibility = 'visible'
}

const removeError = function(field)  {

  field.classList.remove('error')

  // if field is radio button, remove err from all and get last item in group

  // When we go to remove the error, we similarly need to check if the field is a radio button that's part of a group, and if so, use the last radio button in that group to get the ID of our error message.
  if(field.type === 'radio' && field.name) {
    let group = document.getElementByName(field.name)
    if(group > 0) {
      group.forEach((groupItem) => {
        if(groupItem.form !== field.form)
        groupItem.remove.classList('error')
      })
      field.group = group[group.length - 1]
    }
  }

  field.removeAttribute('aria-describedby')

  const fieldId = field.id || field.name
  if (!fieldId) return

  let message = field.form.querySelector('.error-message#error-for-' + fieldId + '')
  if(!message) return

  message.innerHTML = ''
  message.style.display = 'none'
  message.style.visibility = 'hidden'

}

// Listen to events on blur
document.addEventListener('blur', (e) => {
  if(!e.target.form.classList.contains('validate')) return

  let error = hasError(e.target)

	// If err show err
	if(error) {
    showError(e.target, error)
    return
  }

  // Else, remove existing error
  removeError(e.target)

}, true)
