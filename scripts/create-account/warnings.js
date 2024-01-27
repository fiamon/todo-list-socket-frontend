const removeErrorForm = document.getElementById('create-account-form')
const errorValidEmailDiv = document.getElementById('error-valid-email')
const errorAlreadyExistsDiv = document.getElementById('error-already-exists')
const errorPasswordDiv = document.getElementById('error-password')

removeErrorForm.addEventListener('submit', () => { 
  errorAlreadyExistsDiv.classList.add("none")
  errorPasswordDiv.classList.add("none")
  errorValidEmailDiv.classList.add("none")
})

class Warnings {
  errorEmail() {
    errorValidEmailDiv.classList.remove('none')

    const closeBtn = document.getElementById('close-error-valid-email')
    closeBtn.addEventListener('click', () => {
      errorValidEmailDiv.classList.add('none')
    })
  }

  errorUser() {
    errorAlreadyExistsDiv.classList.remove('none')

    const closeBtn = document.getElementById('close-error-already-exists')
    closeBtn.addEventListener('click', () => {
      errorAlreadyExistsDiv.classList.add('none')
    })
  }

  password() {
    errorPasswordDiv.classList.remove('none')

    const closeBtn = document.getElementById('close-error-password')
    closeBtn.addEventListener('click', () => {
      errorPasswordDiv.classList.add('none')
    })
  }

  success() {
    const div = document.getElementById('success')

    div.classList.remove('none') 

    const closeBtn = document.getElementById('close-success')
    closeBtn.addEventListener('click', () => {
      div.classList.add('none')
    })

    setTimeout(() => {
      div.classList.add('none')
      location.replace('http://127.0.0.1:5500/index.html')
    }, 3000)
  }
}
