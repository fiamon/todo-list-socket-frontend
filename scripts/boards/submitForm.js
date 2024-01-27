async function submitNewTaskForm(id, pusher) {
  const title = document.getElementById('title-todo').value
  const status = document.getElementById('select-progress').value
  const description = document.getElementById('description-todo').value
  const membersField = document.getElementById('member').value

  await fetch('http://localhost:8080/board/task', {
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
      assigned_user_id: membersField,
      assigned_board_id: id
    })
  })
  pusher.newTaskHandler()
}
