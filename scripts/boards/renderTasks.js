async function renderTodos(id) {
  const div = document.getElementById(id)
  const createNewBoard = document.getElementById('new-board')
  const board = document.getElementById('board')
  createNewBoard.classList.add('none')
  div.style.backgroundColor = 'rgba(128, 128, 128, 0.30)'
  div.style.borderRight = '3px solid #5AC7AA'
  new PusherHandler(id)

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

  // create tasks
  for (let i = 0; i < boardWithTasks.tasks.length; i++) {
    createTask(boardWithTasks.tasks[i])
  }

  const deleteBoardBtn = document.getElementById('delete')
  deleteBoardBtn.addEventListener('click', async () => {
    await deleteBoard(id)
    div.remove()
    createNewBoard.classList.remove('none')
  })

  const formNewTask = document.getElementById('form-new-task')
  formNewTask.addEventListener('submit', async e => {
    e.preventDefault()
    submitNewTaskForm(id)
  })

  const invitePeopleToBoardForm = document.getElementById('invite-peoplo-to-board')
  invitePeopleToBoardForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const response = await inviteUserToBoard(id)
    
    if(!response.ok) {
      const emailInput = document.getElementById('invite-people-email')
      const nameInput = document.getElementById('invite-people-name')

      emailInput.style.border = '1px dotted red'
      nameInput.style.border = '1px dotted red'
    }
    
    const submitFromInvitePeopleBtn = document.getElementById('invite-people-submit')
    submitFromInvitePeopleBtn.addEventListener('click', () => {
      formDiv.classList.add('none')
    })
  })

  board.classList.remove('none')
}
