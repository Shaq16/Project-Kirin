import { Board } from './Board';

function App() {
  return (
    <div 
      className="min-h-screen w-full relative flex flex-col font-sans overflow-hidden bg-cover bg-center bg-no-repeat items-center p-12"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=3540&auto=format&fit=crop")',
        backgroundColor: '#121212'
      }}
    >
      {/* Dark overlay to ensure text/cards remain readable over any wallpaper */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      {/* The Placement Board (floating directly on background) */}
      <div className="w-full max-w-6xl relative z-10 mt-12">
        {/* Board Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <h1 className="text-2xl font-bold text-white tracking-wide drop-shadow-md">Placement Board</h1>
          <span className="text-sm text-stone-300 font-medium drop-shadow-md">Synced just now</span>
        </div>

        {/* Kanban Columns */}
        <div className="overflow-x-auto kanban-scrollbar pb-2">
          <Board />
        </div>
      </div>
      
    </div>
  );
}

export default App;
