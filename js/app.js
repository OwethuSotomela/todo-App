document.addEventListener('alpine:init', () => {
    Alpine.data('myToDos', () => {
        return {
            userInput: '',
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            filter: 'all',
            theme: 'light',
            
            init() {
                this.$watch('todos', (value) => {
                    localStorage.setItem('todos', JSON.stringify(value));
                });
            },

            addToDo() {
                if (this.userInput.trim().length) {
                    this.todos.push({
                        id: Date.now(),
                        name: this.userInput.charAt(0).toUpperCase() + this.userInput.slice(1),
                        completed: false,
                        createdAt: new Date().toLocaleString()
                    });
                    this.userInput = '';
                }
            },

            checkMyBox(todo) {
                this.todos = this.todos.filter(t => t !== todo);
            },

            filteredTodos() {
                if (this.filter === 'active') {
                    return this.todos.filter(todo => !todo.completed);
                } else if (this.filter === 'completed') {
                    return this.todos.filter(todo => todo.completed);
                }
                return this.todos;
            },

            editToDo(todo, event) {
                todo.name = event.target.innerText;
            },

            exportToDos() {
                const blob = new Blob([JSON.stringify(this.todos, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = "todos.json";
                a.click();
                URL.revokeObjectURL(url);
            },

            toggleTheme() {
                this.theme = this.theme === 'light' ? 'dark' : 'light';
                document.documentElement.classList.toggle('dark', this.theme === 'dark');
            }
        };
    });
});