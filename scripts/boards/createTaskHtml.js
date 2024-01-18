function createTask(task, user) {
  const todoTasks = document.getElementById('todo-tasks')
  const doingTasks = document.getElementById('doing-tasks')
  const doneTasks = document.getElementById('done-tasks')

  const divTask = document.createElement('div')
  divTask.classList.add('task')
  divTask.id = task.id
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

  if (task.status === 'to-do') {
    todoTasks.appendChild(divTask)
  } else if (task.status === 'doing') {
    doingTasks.appendChild(divTask)
  } else {
    doneTasks.appendChild(divTask)
  }

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



  const options = [
    {
      value: 'to-do',
      text: '🚀 To do'
    },
    {
      value: 'doing',
      text: '🚀 Doing'
    },
    {
      value: 'done',
      text: '🚀 Done'
    }
  ]
  let findedText;
  options.map(status => {
    if(status.value === task.status) {
      return findedText = status.text
    }
  })

  const select = document.createElement('select')
  select.name = 'status'
  select.id = 'status'

  const option = document.createElement('option')
  option.value = task.status
  option.innerText = findedText
  select.options.add(option, 1)
  const newOptions = options.filter(option => option.text !== findedText)

  let counter = 2
  for (let i = 0; i < 2; i++) {
    const option = document.createElement('option')
    option.value = newOptions[i].value
    option.innerText = newOptions[i].text
    select.add(option, counter)
    counter++
  }

  divTask.appendChild(divRight)
  divRight.appendChild(select)

  const divPerson = document.createElement('div')
  divPerson.classList.add('person')

  const spanIcon = document.createElement('span')
  spanIcon.classList.add('material-symbols-outlined')
  spanIcon.innerText = 'person'

  const spanNamePerson = document.createElement('span')
  if (!user) {
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
