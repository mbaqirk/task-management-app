import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { AlertCircle, Clock, CheckCircle2, Plus } from 'lucide-react';
import TaskForm from './TaskForm';

export default function Sidebar() {
  const { state } = useTaskContext();
  const [isTaskFormOpen, setIsTaskFormOpen] = React.useState(false);
  
  const expiredTasks = state.tasks.filter(task => 
    task.status !== 'DONE' && new Date(task.deadline) < new Date()
  );
  
  const completedTasks = state.tasks.filter(task => task.status === 'DONE').length;
  const totalTasks = state.tasks.length;

  return (
    <>
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-73px)]">
        <div className="p-6 space-y-6">
         

          {/* Expired Tasks */}
          <div className="rounded-xl bg-red-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Expired Tasks</h2>
                <p className="text-sm text-red-500">{expiredTasks.length} tasks</p>
              </div>
            </div>
          </div>

          {/* All Tasks */}
          <div className="rounded-xl bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">All Active Tasks</h2>
                <p className="text-sm text-blue-600">{totalTasks} tasks</p>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="rounded-xl bg-green-50 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Completed Tasks</h2>
                <p className="text-sm text-green-600">{completedTasks}/{totalTasks} tasks</p>
              </div>
            </div>
          </div>
        </div>

         {/* Add Task Button */}
          <button
            onClick={() => setIsTaskFormOpen(true)}
            className="w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add Task</span>
          </button>
        
        {/* Expired Tasks List */}
        <div className="flex-1 p-6 overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Expired</h3>
          <div className="space-y-3">
            {expiredTasks.map(task => (
              <div key={task.id} className="p-3 bg-red-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-1">{task.title}</h3>
                <p className="text-xs text-red-600">
                  Expired on {new Date(task.deadline).toLocaleDateString()}
                </p>
              </div>
            ))}
            {expiredTasks.length === 0 && (
              <p className="text-sm text-gray-500">No expired tasks</p>
            )}
          </div>
        </div>
      </div>
      {isTaskFormOpen && <TaskForm onClose={() => setIsTaskFormOpen(false)} />}
    </>
  );
}