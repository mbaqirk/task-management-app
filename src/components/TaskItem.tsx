import React from 'react';
import { Task, TaskPriority, TaskStatus } from '../types/task';
import { useTaskContext } from '../context/TaskContext';
import { format } from 'date-fns';
import { MoreHorizontal, Trash2, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';

const priorityColors: Record<TaskPriority, string> = {
  LOW: 'bg-blue-100 text-blue-800',
  MEDIUM: 'bg-orange-100 text-orange-800',
  HIGH: 'bg-red-100 text-red-800',
};

export default function TaskItem({ task }: { task: Task }) {
  const { dispatch } = useTaskContext();
  const deadline = new Date(task.deadline);
  const [showActions, setShowActions] = React.useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  const moveToNextStatus = () => {
    let newStatus: TaskStatus = task.status;
    if (task.status === 'TODO') newStatus = 'IN_PROGRESS';
    else if (task.status === 'IN_PROGRESS') newStatus = 'DONE';
    
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, status: newStatus, updatedAt: new Date().toISOString() }
    });
  };

  const moveToPreviousStatus = () => {
    let newStatus: TaskStatus = task.status;
    if (task.status === 'DONE') newStatus = 'IN_PROGRESS';
    else if (task.status === 'IN_PROGRESS') newStatus = 'TODO';
    
    dispatch({
      type: 'UPDATE_TASK',
      payload: { ...task, status: newStatus, updatedAt: new Date().toISOString() }
    });
  };

  const renderNavigationButtons = () => {
    switch (task.status) {
      case 'TODO':
        return (
          <button
            onClick={moveToNextStatus}
            className="w-full px-4 py-2 text-sm text-left text-blue-600 hover:bg-blue-50 flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            Move to Progress
          </button>
        );
      case 'IN_PROGRESS':
        return (
          <>
            <button
              onClick={moveToPreviousStatus}
              className="w-full px-4 py-2 text-sm text-left text-orange-600 hover:bg-orange-50 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Move to Todo
            </button>
            <button
              onClick={moveToNextStatus}
              className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-green-50 flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Done
            </button>
          </>
        );
      case 'DONE':
        return (
          <button
            onClick={moveToPreviousStatus}
            className="w-full px-4 py-2 text-sm text-left text-orange-600 hover:bg-orange-50 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Move to Progress
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 cursor-move relative group"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {task.status === 'DONE' ? (
            <div className="mb-2">
              <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                Completed
              </span>
            </div>
          ) : (
            <div className="mb-2">
              <span className={`px-2 py-0.5 text-xs rounded-full ${priorityColors[task.priority]}`}>
                {task.priority.toLowerCase()}
              </span>
            </div>
          )}
          <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>
          
          <div className="mt-3 text-xs text-gray-400">
            Deadline: {format(deadline, 'MMM d/yy')}
          </div>
        </div>
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-gray-600"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-100 py-1 z-10">
              {renderNavigationButtons()}
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}