function todoApp() {
  return {
    newTask: '',
    tasks: [],
    filter: 'all',
    theme: 'light',

    init() {
      const saved = localStorage.getItem('tasks');
      if (saved) {
        this.tasks = JSON.parse(saved);
      }
    },

    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = '';
        this.saveTasks();
      }
    },

    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks();
    },

    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    filteredTasks() {
      if (this.filter === 'active') {
        return this.tasks.filter(t => !t.completed);
      } else if (this.filter === 'completed') {
        return this.tasks.filter(t => t.completed);
      }
      return this.tasks;
    },

    completedCount() {
      return this.tasks.filter(t => t.completed).length;
    },

    exportTasks() {
      const data = JSON.stringify(this.tasks, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = "tasks.json";
      a.click();
      URL.revokeObjectURL(url);
    },

    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', this.theme === 'dark');
    }
  }
}