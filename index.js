const form = document.querySelector('[name="verify"]')
const inputs = form.querySelectorAll('.inputs input')
const submit = document.querySelector('[type="submit"]')

function verify() {
  const inputsArr = Array.prototype.slice.call(inputs)
  const canSubmit = inputsArr.every((input) => input.value.length > 0)
  if (canSubmit) {
    submit.classList.add('canSubmit')
  } else {
    submit.classList.remove('canSubmit')
  }

  return canSubmit
}

function handleInput(e) {
  const input = e.target
  const value = input.value.replace(/[^0-9]/g, '').trim()

  inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 8 || e.keyCode == 46 || e.keyCode === 37)
        input.previousElementSibling?.select()

      if (e.keyCode === 39) input.nextElementSibling?.select()
    })
  })

  verify()

  if (input.nextElementSibling && value) input.nextElementSibling?.select()
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text')
  let count = 0

  inputs.forEach((input, i) => {
    input.value = paste[i] || ''
    count += input.value.length > 0
  })

  if (!verify() && inputs[count]) inputs[count].select()
}

function handleSubmit(e) {
  e.preventDefault()
  verify()

  if (verify()) alert('verified!')
}

inputs[0].addEventListener('paste', handlePaste)

form.addEventListener('input', handleInput)

form.addEventListener('paste', handleSubmit)

form.addEventListener('submit', handleSubmit)
