/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import { filters } from '@/config/params'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { generateGuid } from '@/utils'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

const STORAGE_KEY = '@tasks';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface Filter {
  id: string;
  key: keyof Task; // Aseguramos que key es una clave de Task
  value: any;
}

interface TaskContextProps {
  tasks: Task[];
  taskFilter: string;
  filteredTask: Task[];
  completedTasks: Task[];
  setupTasks: (list: Task[]) => void;
  addTask: (newTask: string) => void;
  updateTask: (updatedTask: Task) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  changeFilter: (filter: Filter) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>('all');

  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      const data = JSON.parse(storage);
      setupTasks(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks]);

  const filteredTask = useMemo(() => {
    const filter = filters.find((f) => f.id === taskFilter);
    if (filter?.id === 'all') return tasks;
    return tasks.filter((task) => task[filter.key] === filter.value); // Aquí aseguramos que key es una clave de Task
  }, [tasks, taskFilter]);

  const findTaskIndex = (id: string) => tasks.findIndex((t) => t.id === id);

  const addTask = (newTask: string) => {
    const task: Task = {
      id: generateGuid(),
      name: newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    const index = findTaskIndex(updatedTask.id);
    if (index !== -1) {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      setTasks(newTasks);
    }
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const changeFilter = (filter: Filter) => {
    setTaskFilter(filter.id);
  };

  const setupTasks = (list: Task[]) => {
    setTasks(list);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskFilter,
        filteredTask,
        completedTasks,
        setupTasks,
        addTask,
        updateTask,
        removeTask,
        completeTask,
        changeFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskStore = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskStore must be used within a TaskProvider');
  }
  return context;
};
