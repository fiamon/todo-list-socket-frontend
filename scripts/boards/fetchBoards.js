const listsDiv = document.getElementById('lists')
async function fetchBoards() {
  const response = await fetch('http://localhost:8080/board', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    }
  })

  if (!response.ok) {
    location.replace('http://127.0.0.1:5500/index.html')
  }

  let data = [await response.json()]

  for (let i = 0; i < data.length; i++) {
    const boards = data[0].boards

    for (let j = 0; j < boards.length; j++) {
      const element = document.createElement('div')
      element.classList.add('list')
      element.id = boards[j].id
      element.innerHTML = `<span>${boards[j].title}</span><p>${boards[j].description}</p>`
      element.onclick = function () {
        renderTodos(this.id)
      }
      listsDiv.appendChild(element)
    }
  }
  return data
}

function createBoardDiv(board) {
  const listsDiv = document.getElementById('lists')
  const element = document.createElement('div')
  element.classList.add('list')
  element.id = board.id
  element.innerHTML = `<span>${board.title}</span><p>${board.description}</p>`
  element.onclick = function () {
    renderTodos(this.id)
  }
  listsDiv.appendChild(element)
}
