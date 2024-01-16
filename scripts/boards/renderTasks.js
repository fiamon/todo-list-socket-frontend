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
  for (val of boardWithTasks.users) {
    const element = document.createElement('option')
    element.value = val.id
    const firstName = val.full_name.split(' ')
    element.innerText = firstName[0]
    membersField.appendChild(element)
  }

  for (let i = 0; i < boardWithTasks.tasks.length; i++) {
    const todoTasks = document.getElementById('todo-tasks')

    const divTask = document.createElement('div')
    divTask.classList.add('task')
    const divLeft = document.createElement('div')
    divLeft.classList.add('left')
    const divHeader = document.createElement('div')
    divHeader.classList.add('header-task')

    const spanArticle = document.createElement('span')
    spanArticle.classList.add('material-symbols-outlined', 'article')
    spanArticle.innerText = 'article'

    const spanName = document.createElement('span')
    spanName.classList.add('title-task')
    spanName.innerText = boardWithTasks.tasks[i].title

    todoTasks.appendChild(divTask)
    divTask.appendChild(divLeft)
    divLeft.appendChild(divHeader)
    divHeader.appendChild(spanArticle)
    divHeader.appendChild(spanName)

    const divForP = document.createElement('div')
    const paragraph = document.createElement('p')
    paragraph.innerText = boardWithTasks.tasks[i].description
    divLeft.appendChild(divForP)
    divForP.appendChild(paragraph)

    const divRight = document.createElement('div')
    divRight.classList.add('right')

    const select = document.createElement('select')
    select.name = 'status'
    select.id = 'status'

    const optionTodo = document.createElement('option')
    optionTodo.value = 'todo'
    optionTodo.innerText = '🚀 To do'

    const optionDoing = document.createElement('option')
    optionDoing.value = 'doing'
    optionDoing.innerText = '🚀 Doing'

    const optionDone = document.createElement('option')
    optionDone.value = 'done'
    optionDone.innerText = '🚀 Done'

    divTask.appendChild(divRight)
    divRight.appendChild(select)
    select.appendChild(optionTodo)
    select.appendChild(optionDoing)
    select.appendChild(optionDone)

    const divPerson = document.createElement('div')
    divPerson.classList.add('person')

    const spanIcon = document.createElement('span')
    spanIcon.classList.add('material-symbols-outlined')
    spanIcon.innerText = 'person'

    const spanNamePerson = document.createElement('span')
    const FirstName = boardWithTasks.tasks[i].assigned_user_id.full_name.split(' ')
    spanNamePerson.innerText = FirstName[0]

    divRight.appendChild(divPerson)
    divPerson.appendChild(spanIcon)
    divPerson.appendChild(spanNamePerson)

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
