import React, { useState } from 'react';
import { useTaskStore } from '@/stores/TaskContext';

const AddTaskForm: React.FC = () => {
  const taskStore = useTaskStore();
  const [newTask, setNewTask] = useState('');

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTask.trim() === '') return;
    taskStore.addTask(newTask);
    setNewTask('');
  };

  return (
    <form onSubmit={submit}>
      <div className="flex">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Añadir una tarea"
          className="outline-0 border-none bg-[var(--subtle-color)] p-2 rounded-s-md w-full"
        />
        <button
          type="submit"
          className="bg-[var(--subtle-color)] rounded-e-md p-2 border-l border-[var(--bg-color)] hover:bg-[var(--outline-color)]"
        >
          Añadir
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
