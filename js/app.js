document.addEventListener('alpine:init', () => {
    Alpine.data('myToDos', () => {
        return {
            userInput: '',
            todos: [],
            addToDo() {
                if (this.userInput.trim().length) {
                    this.todos.push({ 
                        name: this.userInput.charAt(0).toUpperCase() + this.userInput.slice(1), 
                        completed: false 
                    });
                    this.userInput = '';
                }
            },
            checkMyBox(todo) {
                this.todos = this.todos.filter(t => t !== todo);
            }
        };
    });
});
