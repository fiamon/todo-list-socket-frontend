const createNewBoard = document.getElementById('start-new-board')
const form = document.getElementById('create-new-board-form')
const newListBtnHeader = document.getElementById('new-list-header')
const listsDiv = document.getElementById('lists')

document.addEventListener('DOMContentLoaded', async () => {
  await fetchBoards()
})
createNewBoard.addEventListener('click', () => {
  form.classList.remove("none")
})
newListBtnHeader.addEventListener('click', () => {
  form.classList.remove('none')
})
const closeBtn = document.getElementById('close')
closeBtn.addEventListener('click', () => {
  form.classList.add('none')
})

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

  if(data.statusCode === 400) {
    title.style.border = "2px dotted red"
    description.style.border = "2px dotted red"
    return
  }
  if(data.statusCode === 401) {
    return location.replace('http://127.0.0.1:5500/index.html')
  }
  
  const submitBtn = document.getElementById('submit-btn')
  submitBtn.addEventListener('click', () => {
    form.classList.add('none')
  })
})

async function fetchBoards(){
    const response = await fetch('http://localhost:8080/board', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
  
    if(!response.ok) {
      location.replace('http://127.0.0.1:5500/index.html')
    }

    let data = [await response.json()]

    for(let i = 0; i < data.length; i++) {
      const boards = data[0].boards

      for(let j = 0; j<boards.length; j++) {
        const element = document.createElement('div')
        element.classList.add('list')
        element.innerHTML = `<span>${boards[j].title}</span><p>${boards[j].description}</p>`
        listsDiv.appendChild(element)
      }
    }
    return data
}
