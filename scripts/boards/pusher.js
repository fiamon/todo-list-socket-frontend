class PusherHandler {
  constructor(boardId) {
    this.boardId = boardId

    Pusher.logToConsole = true;
    this.pusher = new Pusher('81b9344e362ece28cc37', {
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

