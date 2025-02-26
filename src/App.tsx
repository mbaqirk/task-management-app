import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import Sidebar from './components/Sidebar';
import { Search, Filter } from 'lucide-react';

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Project"
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-gray-300"
              />
            </div>
            <button className="ml-4 px-4 py-2 rounded-full border border-gray-200 flex items-center gap-2 hover:bg-gray-50">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-600">Filter</span>
            </button>
          </div>
        </nav>

        <div className="flex flex-1">
          <Sidebar />
          
          <div className="flex-1 p-8">
            {/* Task Lists */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <TaskList status="TODO" />
              </div>
              <div>
                <TaskList status="IN_PROGRESS" />
              </div>
              <div>
                <TaskList status="DONE" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;