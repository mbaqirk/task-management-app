import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task } from '../types/task';
import { X, Check } from 'lucide-react';

interface TaskFormProps {
  onClose: () => void;
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const { dispatch } = useTaskContext();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...formData,
      priority: 'MEDIUM',
      status: 'TODO',
      duration: 60,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_TASK', payload: newTask });
    setFormData({
      title: '',
      description: '',
      deadline: '',
    });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-sm p-6 text-center">
          <div className="w-16 h-16 bg-black rounded-xl mx-auto mb-4 flex items-center justify-center">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold mb-2">new task has been created successfully</h2>
          <button
            onClick={onClose}
            className="w-full mt-4 px-6 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-900"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            ADD TASK
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-0 py-2 text-lg font-medium border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 placeholder-gray-400"
                required
              />
            </div>
            
            <div>
              <textarea
                placeholder="Task Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-0 py-2 text-base border-0 border-b-2 border-gray-200 focus:border-blue-500 focus:ring-0 placeholder-gray-400 min-h-[150px] resize-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}