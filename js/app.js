document.addEventListener('alpine:init', () => {
    Alpine.data('myToDos', () => {
        return {
            init() {
                console.log('From scratch')
            },
            open: false,
            userInput: '',
            todos: [],
            addToDo() {
                if (this.userInput.trim().length)
                    this.todos.push({ name: this.userInput[0].toUpperCase() + this.userInput.slice(1).toLowerCase(), completed: false }); this.userInput = ''
            }
        }
    })
})