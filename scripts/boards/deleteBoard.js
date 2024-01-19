async function deleteBoard(boardId) {
  await fetch('http://localhost:8080/board/' + boardId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
  })
}
