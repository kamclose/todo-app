export function ButtonOutline({ children, onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      type='button'
      className='group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-violet-600 focus-visible:ring-slate-300'
    >
      {children}
    </button>
  );
}

export function ButtonSolid({ children, onClickHandler, type = 'button' }) {
  return (
    <button
      onClick={onClickHandler}
      type={type}
      className='group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-800 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-700 active:text-slate-300 focus-visible:outline-slate-900'
    >
      {children}
    </button>
  );
}
