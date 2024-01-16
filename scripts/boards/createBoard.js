const form = document.getElementById('create-new-board-form')
const listsDiv = document.getElementById('lists')

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
  
  const membersField = document.getElementById('member')
  for (val of data.users) {
    const element = document.createElement('option')
    element.value = val.id
    const firstName = val.full_name.split(' ')
    element.innerText = firstName[0]
    membersField.appendChild(element)
  }

  const deleteBoard = document.getElementById('delete')
  deleteBoard.addEventListener('click', async () => {
    await deleteBoard(id)
    div.remove()
    createNewBoard.classList.remove('none')
  })


  const formNewTask = document.getElementById('form-new-task')
  formNewTask.addEventListener('submit', async e => {
    e.preventDefault()
    submitNewTaskForm(id)
  })

  board.classList.remove('none')
}

const newTaskBtn = document.getElementById("new-task")
newTaskBtn.addEventListener('click', async () => {
  const newTaskForm = document.getElementById('new-task-form')
  newTaskForm.classList.remove('none')

  const closeNewTaskFormBtn = document.getElementById('close-new-task-form')
  closeNewTaskFormBtn.addEventListener('click', () => {
    newTaskForm.classList.add('none')
  })
})
