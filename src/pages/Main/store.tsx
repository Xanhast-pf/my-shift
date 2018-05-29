import { decorate, observable, computed } from "mobx";

class Todo {
    id = Math.random();
    title = "";
    finished = false;
}

decorate(Todo, {
    title: observable,
    finished: observable,
});

export class TodoList {
    @observable todos: Todo[] = [];
    @computed
    get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
