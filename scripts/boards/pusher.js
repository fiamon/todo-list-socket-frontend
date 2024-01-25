let channel;
Pusher.logToConsole = true;
const pusher = new Pusher('5698ffb683bdd7893c6a', {
  cluster: 'us2'
});

function createChannel(boardId) {
  channel = pusher.subscribe(`updateTasks-${boardId}`);
}

function newTaskHandler() {
  channel.bind('newTask', data => {
    console.log('oi')
    createTask(data.task, data.user.assigned_user_id)
  });
}

function updateTask() {
  channel.bind('updateTask', data => {
    const div = document.getElementById(data.task.id)
    div.remove()
    createTask(data.task)
  });
}


