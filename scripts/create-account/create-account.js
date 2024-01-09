const form = document.getElementById('create-account-form')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const fullName = document.getElementById("full_name").value
  const userEmail = document.getElementById("email").value
  const userPassword = document.getElementById("password").value
  const warnings = new Warnings()

  fetch('http://localhost:8080/user', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "full_name": fullName,
      "email": userEmail,
      "password": userPassword
    })
  })
    .then(response => {
      if(response.message === "usercreated") {
        warnings.success
      } else {
        return response.json()
      }
    })
    .then(response => {
      if (response.message[0] === "email must be an email") {
        return warnings.errorEmail()
      } else if (response.message[0] === "password is not strong enough") {
        return warnings.password()
      } else if (response.message[0] === "User already exists" || response.statusCode === 400) {
        return warnings.errorUser()
      }

      if(response.message === "usercreated") {
        return warnings.success()
      }
    })
    .catch(err => err)

})
