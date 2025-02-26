import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskStatus } from '../types/task';
import TaskItem from './TaskItem';
// import { MoreVertical } from 'lucide-react';

const statusColors: Record<TaskStatus, string> = {
  TODO: 'border-indigo-400 after:bg-indigo-400',
  IN_PROGRESS: 'border-orange-400 after:bg-orange-400',
  DONE: 'border-green-400 after:bg-green-400',
  // Add any other TaskStatus values here
};

const statusLabels: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'On Progress',
  DONE: 'Done',
  // Add corresponding labels for other statuses
};

const statusDotColors: Record<TaskStatus, string> = {
  TODO: 'text-indigo-600',
  IN_PROGRESS: 'text-orange-400',
  DONE: 'text-green-400',
  // Add matching dot colors
};


export default function TaskList({ status }: { status: TaskStatus }) {
  const { state, dispatch } = useTaskContext();
  const tasks = state.tasks.filter((task) => task.status === status);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-100');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('bg-gray-100');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-100');
    
    const taskId = e.dataTransfer.getData('text/plain');
    const task = state.tasks.find(t => t.id === taskId);
    
    if (task && task.status !== status) {
      dispatch({
        type: 'UPDATE_TASK',
        payload: { ...task, status, updatedAt: new Date().toISOString() }
      });
    }
  };

  return (
    <div 
      className="bg-gray-100 rounded-xl p-4 transition-colors duration-200"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="mb-6">
        <div className={`relative border-b-2 pb-2 ${statusColors[status]}`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusDotColors[status]}`} />
            <h2 className="text-sm font-medium text-gray-900">
              {statusLabels[status]}
            </h2>
            <span className="ml-1 text-sm text-gray-500">
              {tasks.length}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}