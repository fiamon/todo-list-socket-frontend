class PusherHandler {
  constructor(boardId) {
    Pusher.logToConsole = true;
    this.pusher = new Pusher('5698ffb683bdd7893c6a', {
      cluster: 'us2'
    });
    this.boardId = boardId


    this.channel = this.pusher.subscribe(`updateTasks-${this.boardId}`);
  }

  newTaskHandler() {
    this.channel.bind('newTask', async data => {
      createTask(data.task, data.user.assigned_user_id, this.pusher)
    });
  }

  updateTask() {
    this.channel.bind('updateTask', data => {
      const div = document.getElementById(data.task.id)
      div.remove()
      createTask(data.task)
    });
  }
}

