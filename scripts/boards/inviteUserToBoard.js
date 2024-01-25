async function inviteUserToBoard(boardId) {
  const email = document.getElementById('invite-people-email').value
  
  const respose = await fetch(`http://localhost:8080/board/invite/${boardId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
    body: JSON.stringify({
      email,
    })
  })
  return respose
}
