/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import { filters } from '@/config/params'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { generateGuid } from '@/utils'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { Filter, Task, TaskContextProps } from '@/types';

const STORAGE_KEY = '@tasks';

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<string>('all');

  useEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      const data = JSON.parse(storage);
      setTasks(data);
    }
  }, []);

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
    setTasks((prevTasks) => {
      const combinedTasks = [...prevTasks, task];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(combinedTasks));
      return combinedTasks;
    });
  };

  const updateTask = (updatedTask: Task) => {
    const index = findTaskIndex(updatedTask.id);
    if (index !== -1) {
      const newTasks = [...tasks];
      newTasks[index] = updatedTask;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      setTasks(newTasks);
    }
  };

  const removeTask = (id: string) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((task) => task.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const completeTask = (id: string) => {
    setTasks((prevTasks) => {
      const newTasks = prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
      return newTasks;
    });
  };

  const changeFilter = (filter: Filter) => {
    setTaskFilter(filter.id);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskFilter,
        filteredTask,
        completedTasks,
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
