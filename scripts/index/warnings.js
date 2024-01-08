class Warnings {
  error() {
    const div = document.getElementById('error')

    div.classList.remove('none')

    const closeBtn = document.getElementById('close-error')
    closeBtn.addEventListener('click', () => {
      div.classList.add('none')
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
      location.replace('http://localhost:8080/home.html')
    }, 3000)
  }
}
