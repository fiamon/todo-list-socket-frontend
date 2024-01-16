const form = document.getElementById('create-new-board-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const title = document.getElementById("title")
  const description = document.getElementById("description")

  const response = await fetch('http://localhost:8080/board/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
    body: JSON.stringify({
      'title': title.value,
      'description': description.value,
    })
  })
  const data = await response.json()

  if (data.statusCode === 400) {
    title.style.border = "2px dotted red"
    description.style.border = "2px dotted red"
    return
  }
  if (data.statusCode === 401) {
    return location.replace('http://127.0.0.1:5500/index.html')
  }
})
