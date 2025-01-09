import clsx from 'clsx';

function SideBar() {
  return (
    <aside
      className={clsx(
        'bg-blue',
        'top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0'
      )}
      aria-label='Sidebar'
    >
      Configurator
    </aside>
  );
}

function App() {
  return (
    <section className={clsx('bg-black text-white', 'min-h-screen', ' flex md:flex-row flex-col')}>
      <main className={'flex-grow bg-green'}></main>
      <SideBar />
    </section>
  );
}

export default App;
