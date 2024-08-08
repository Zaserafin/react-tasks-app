import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { TaskItemProps } from '../types';
import { useTaskStore } from '@/stores/TaskContext';

export default function TaskItem(props: TaskItemProps) {
  const taskStore = useTaskStore();
  const { task } = props;
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState('');
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setText(task.name);
    setCompleted(task.completed);
  }, [task]);

  const handleUpdateClick = () => {
    setShowInput(!showInput);
    if (showInput) {
      const updatedTask = {
        id: task.id,
        name: text,
        completed: task.completed,
      };
      taskStore.updateTask(updatedTask);
    }
  };

  const handleCompleteTask = () => {
    taskStore.completeTask(task.id);
  };

  const handleDelete = () => {
    taskStore.removeTask(task.id);
  };

  return (
    <li className="flex justify-between items-center h-11">
      {showInput ? (
        <input
          className="outline-0 border-none bg-[var(--subtle-color)] p-2 w-full me-2"
          placeholder="Edit task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
        />
      ) : (
        <label className="w-full flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="me-1 cursor-pointer w-4 h-4"
            checked={completed}
            onChange={handleCompleteTask}
          />
          <div className="truncate">{text}</div>
        </label>
      )}
      <div className="flex gap-1 flex-shrink-0">
        {!showInput && (
          <Button color="red" onClick={handleDelete}>
            <i className="bi bi-trash-fill"></i>
          </Button>
        )}
        <Button color="green" onClick={handleUpdateClick}>
          {!showInput ? <i className="bi bi-pencil-fill"></i> : <i className="bi bi-check-lg"></i>}
        </Button>
      </div>
    </li>
  );
}
