const form = document.getElementById('login-form')

form.addEventListener('submit', async e => {
  e.preventDefault()

  const userEmail = document.getElementById("email").value
  const userPassword = document.getElementById("password").value
  const warnings = new Warnings()

  fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
       "email": userEmail, 
       "password": userPassword
      })
  })
    .then(response => response.json())
    .then(response => {
      if(response.statusCode == 404 || response.statusCode === 400) {
        warnings.error()
      } else {
        warnings.success()
      }
      
    })
    .catch(err => err)

})
