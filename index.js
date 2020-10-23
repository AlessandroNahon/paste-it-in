const form = document.querySelector('[name="verify"]')
const inputs = form.querySelectorAll('.inputs input')
const submit = document.querySelector('[type="submit"]')

function handleInput(e) {
  const input = e.target
  const value = input.value.replace(/[^0-9]/g, '').trim()
  let canSubmit = false

  inputs.forEach((input) => {
    const value = input.value.trim()
    canSubmit = value.length > 0

    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 8 || e.keyCode == 46)
        input.previousElementSibling?.select()

      if (e.keyCode === 39) input.nextElementSibling?.select()

      if (e.keyCode === 37) input.previousElementSibling?.select()
    })
  })

  if (input.nextElementSibling && value) {
    input.nextElementSibling?.select()
  }

  if (canSubmit) {
    submit.classList.add('canSubmit')
  } else {
    submit.classList.remove('canSubmit')
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text')
  inputs.forEach((input, i) => (input.value = paste[i] || ''))
}

function handleSubmitOnPaste(e) {
  e.preventDefault()
  let canSubmit = false

  inputs.forEach((input) => {
    const value = input.value.trim()
    canSubmit = value.length > 0
  })

  if (canSubmit) {
    e.target.form.submit()
  }
}

inputs[0].addEventListener('paste', handlePaste)

form.addEventListener('input', handleInput)

form.addEventListener('paste', handleSubmitOnPaste)
