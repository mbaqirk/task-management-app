import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Task } from '../types/task';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
} | null>(null);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Check for task timeouts every minute
  useEffect(() => {
    const checkTimeouts = () => {
      const now = new Date();
      state.tasks.forEach((task) => {
        if (task.status !== 'DONE') {
          const deadline = new Date(task.deadline);
          if (now > deadline) {
            dispatch({
              type: 'UPDATE_TASK',
              payload: { ...task},
            });
          }
        }
      });
    };

    const interval = setInterval(checkTimeouts, 60000);
    return () => clearInterval(interval);
  }, [state.tasks]);


  return (
    
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}