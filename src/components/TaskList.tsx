import Task from './Task';
import { useTaskStore } from '@/stores/TaskContext';

export default function TaskList() {
  const taskStore = useTaskStore();

  return (
    <ul className="overflow-y-scroll h-[calc(100%_-_136px)] divide-y divide-slate-600 mt-4">
      {taskStore.filteredTask.length === 0 ? (
        <h2 className="text-lg my-2 text-center">No hay tareas registradas.</h2>
      ) : (
        taskStore.filteredTask.map((task) => <Task key={task.id} task={task} />)
      )}
    </ul>
  );
}
