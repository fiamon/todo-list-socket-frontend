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

document.addEventListener('DOMContentLoaded', async () => {
  await fetchBoards()
})
