const createNewBoard = document.getElementById('start-new-board')
const form = document.getElementById('create-new-board-form')
const newListBtnHeader = document.getElementById('new-list-header')
const listsDiv = document.getElementById('lists')
const logoutBtn = document.getElementById('logout')

logoutBtn.addEventListener('click', () => {
  location.replace('http://127.0.0.1:5500/index.html')
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
const submitBtn = document.getElementById('submit-btn')
submitBtn.addEventListener('click', () => {
  form.classList.add('none')
})
document.addEventListener('DOMContentLoaded', async () => {
await fetchBoards()
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
        element.id = boards[j].id
        element.innerHTML = `<span>${boards[j].title}</span><p>${boards[j].description}</p>`
        element.onclick= function() {
          renderTodos(this.id)
          boardId = this.id
        }
        listsDiv.appendChild(element)
      }
    }
    return data
}

async function renderTodos(id) {
  const div = document.getElementById(id)
  const createNewBoard = document.getElementById('new-board')
  const board = document.getElementById('board')

  createNewBoard.classList.add('none')
  div.style.backgroundColor = 'rgba(128, 128, 128, 0.30)'
  div.style.borderRight = '3px solid #5AC7AA'

  const response = await fetch('http://localhost:8080/board/' + id, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
  })
  const boardWithTasks = await response.json()

  const title = document.getElementById('title-board')
  title.innerText = boardWithTasks.title

  const deleteBoard = document.getElementById('delete')
  deleteBoard.addEventListener('click', async () => {
    await fetch('http://localhost:8080/board/' + id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      },
    })
    div.remove()
    createNewBoard.classList.remove('none')
  })
  const formNewTask = document.getElementById('form-new-task')
  formNewTask.addEventListener('submit', async e => {
    e.preventDefault()
    submitNewTaskFrom(id)
  })

  board.classList.remove('none')
}

const newTaskBtn = document.getElementById("new-task")
newTaskBtn.addEventListener('click', () => {
  const newTaskForm = document.getElementById('new-task-form')
  newTaskForm.classList.remove('none')

  const closeNewTaskFormBtn = document.getElementById('close-new-task-form')
  closeNewTaskFormBtn.addEventListener('click', () => {
    newTaskForm.classList.add('none')
  })
})

async function submitNewTaskFrom(id) {
    const response = await fetch(`http://localhost:8080/board/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      }
    })
    const data = await response.json()
  
    const title = document.getElementById('title-todo').value
    const status = document.getElementById('select-progress').value
    const description = document.getElementById('description-todo').value
    
    const membersField = document.getElementById('member')
    for(val of data.users) {
      const element = document.createElement('option')
      element.value = val.id
      const firstName = val.full_name.split(' ')
      element.innerText = firstName[0]
      membersField.appendChild(element)
    }

    fetch('http://localhost:8080/board/task', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
      },
      body: JSON.stringify({
        title,
        description,
        status,
        assigned_user_id: membersField.value,
        assigned_board_id: id
      })
    })
}
