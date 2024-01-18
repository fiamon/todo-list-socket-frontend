function createTask(task, user) {
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
  spanName.innerText = task.title

  todoTasks.appendChild(divTask)
  divTask.appendChild(divLeft)
  divLeft.appendChild(divHeader)
  divHeader.appendChild(spanArticle)
  divHeader.appendChild(spanName)

  const divForP = document.createElement('div')
  const paragraph = document.createElement('p')
  paragraph.innerText = task.description
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
  if(!user) {
    const FirstName = task.assigned_user_id.full_name.split(' ')
    spanNamePerson.innerText = FirstName[0]
  } else {
    const FirstName = user.full_name.split(' ')
    spanNamePerson.innerText = FirstName[0]
  }

  divRight.appendChild(divPerson)
  divPerson.appendChild(spanIcon)
  divPerson.appendChild(spanNamePerson)
}
