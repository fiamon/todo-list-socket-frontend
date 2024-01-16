async function deleteBoard(id) {
  fetch('http://localhost:8080/board/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
    },
  })
}
