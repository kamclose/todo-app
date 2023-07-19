import toast, { Toaster } from 'react-hot-toast';

import useCurrentCategoryStore from '../stores/useCurrentCategoryStore';
import useTodoStore from '../stores/useTodoStore';

import { ButtonSolid } from '../components/Button';
import { useEffect } from 'react';

const notify = (text) => toast.error(text);

const Todos = () => {
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const category = useCurrentCategoryStore((state) => state.category);
  const setCategory = useCurrentCategoryStore((state) => state.setCategory);

  const filterTodo = () => {
    if (category === 'completed')
      return todos.filter((todo) => todo.completed === true);

    if (category === 'incomplete')
      return todos.filter((todo) => todo.completed === false);

    return todos;
  };

  const isSameTodo = (value) => {
    const todoTexts = todos.map((todo) => todo.text);
    return todoTexts.includes(value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();

    const text = e.target.elements.todoText.value;

    if (isSameTodo(text)) {
      notify('Todo already exist!');
      return;
    }

    if (text.trim() !== '') {
      addTodo(text);
      e.target.elements.todoText.value = '';
    }
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, [setTodos]);

  return (
    <div className='container mx-auto max-w-2xl px-5 py-8'>
      <Toaster position='bottom-right' />
      <h1 className='text-3xl font-medium font-display text-center'>
        Todo List
      </h1>

      <form
        className='mt-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-5'
        onSubmit={handleAddTodo}
      >
        <div className='flex-1'>
          <label htmlFor='todo' className='sr-only'>
            New Todo title
          </label>
          <input
            type='text'
            name='todoText'
            id='todoText'
            className='shadow-sm focus:ring-violet-500 focus:border-violet-500 block w-full text-sm border-slate-300 rounded-md'
            placeholder='Your new Todo title here'
          />
        </div>

        <ButtonSolid type='submit'>Add a new Todo</ButtonSolid>
      </form>

      <div className='mt-12'>
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
            <div className='sm:flex-auto w-full'>
              <h1 className='text-xl font-semibold text-slate-900'>
                Your Todo
              </h1>
              <p className='mt-1 text-sm text-slate-700'>
                Todo that you'll add will be visible here.
              </p>
            </div>

            <div className='w-full max-w-[12.5rem]'>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700'
              >
                Show Todos
              </label>
              <select
                id='location'
                name='location'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm rounded-md'
              >
                <option value='all'>All</option>
                <option value='completed'>Completed</option>
                <option value='incomplete'>Incomplete</option>
              </select>
            </div>
          </div>
          <div className='mt-6 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg max-h-96 overflow-y-scroll'>
                  <table className='min-w-full divide-y divide-slate-300'>
                    <thead className='bg-slate-50 sticky z-50 top-0 ring-1 ring-slate-200'>
                      <tr className='divide-x divide-slate-200'>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-slate-900 sm:pl-6'
                        >
                          Todo
                        </th>
                        <th
                          scope='col'
                          className='px-4 py-3.5 text-left text-sm font-semibold text-slate-900'
                        ></th>
                      </tr>
                    </thead>

                    <tbody className='divide-y divide-slate-200 bg-white'>
                      {filterTodo().length === 0 && (
                        <tr>
                          <td className='text-sm py-2.5 px-2 text-center text-slate-500 font-medium'>
                            Nothing to show here 😐
                          </td>
                        </tr>
                      )}
                      {filterTodo().map(({ text, completed }, index) => (
                        <tr key={text} className='divide-x divide-slate-200'>
                          <td className='whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-slate-900 sm:pl-6 w-full'>
                            <div className='flex items-center'>
                              <div>
                                <input
                                  id='todo'
                                  name='todo'
                                  type='checkbox'
                                  checked={completed}
                                  onChange={() => toggleTodo(index)}
                                  className='focus:ring-violet-500 h-4 w-4 text-violet-600 border-slate-300 rounded peer'
                                />
                                <label
                                  htmlFor='todo'
                                  className='font-medium text-gray-700 select-none text-sm ml-3 translate-y-[1px] inline-block peer-checked:line-through peer-checked:opacity-60'
                                >
                                  {text}
                                </label>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace p-4 text-slate-500'>
                            <button
                              onClick={() => {
                                removeTodo(index);
                              }}
                              type='button'
                              className='inline-flex items-center justify-center text-red-500 hover:text-red-600'
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='currentColor'
                                className='w-5 h-5'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todos;
