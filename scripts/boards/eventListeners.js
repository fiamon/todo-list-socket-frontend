const logoutBtn = document.getElementById('logout')
logoutBtn.addEventListener('click', () => {
  location.replace('http://127.0.0.1:5500/index.html')
})

const createNewBoard = document.getElementById('start-new-board')
createNewBoard.addEventListener('click', () => {
  form.classList.remove("none")
})

const newListBtnHeader = document.getElementById('new-list-header')
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


const newTaskBtn = document.getElementById("new-task")
newTaskBtn.addEventListener('click', async () => {
  const newTaskForm = document.getElementById('new-task-form')
  newTaskForm.classList.remove('none')
  
  const submitNewTask = document.getElementById('submit-new-task-btn')
  submitNewTask.addEventListener('click', () => {
    newTaskForm.classList.add('none')
  })

  const closeNewTaskFormBtn = document.getElementById('close-new-task-form')
  closeNewTaskFormBtn.addEventListener('click', () => {
    newTaskForm.classList.add('none')
  })
})

const closeInviteToBoardForm = document.getElementById('close-invite-people-to-board-form')
closeInviteToBoardForm.addEventListener('click', () => {
  const formDiv = document.getElementById('invite-peoplo-to-board')
  formDiv.classList.add('none')
})

const invitePeopleToBoard = document.getElementById('invite-user')
invitePeopleToBoard.addEventListener('click', async () => {
  const formDiv = document.getElementById('invite-peoplo-to-board')
  formDiv.classList.remove('none')
})

document.addEventListener('DOMContentLoaded', async () => {
  await fetchBoards()
})
