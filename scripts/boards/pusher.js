class PusherHandler {
  constructor(boardId) {
    this.boardId = boardId

    Pusher.logToConsole = true;
    this.pusher = new Pusher('5698ffb683bdd7893c6a', {
      cluster: 'us2'
    });

    this.channel = this.pusher.subscribe(`updateTasks-${this.boardId}`);
  }

  newTaskHandler() {
    this.channel.bind('newTask', data => {
      createTask(data.task, data.user.assigned_user_id)
    });
  }

  updateTask() {
    this.channel.bind('updateTask', data => {
      alert(JSON.stringify(data));
    });
  }
}

