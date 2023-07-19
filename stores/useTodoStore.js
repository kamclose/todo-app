import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  setTodos: (todos) => set(() => ({ todos })),

  addTodo: (text) =>
    set((state) => {
      const newTodos = [...state.todos, { text, completed: false }];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { todos: newTodos };
    }),

  toggleTodo: (index) =>
    set((state) => {
      const todos = [...state.todos];
      todos[index].completed = !todos[index].completed;
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    }),

  removeTodo: (index) =>
    set((state) => {
      const todos = state.todos.filter((_, i) => i !== index);
      localStorage.setItem('todos', JSON.stringify(todos));
      return { todos };
    }),
}));

export default useTodoStore;
