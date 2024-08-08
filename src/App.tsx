/* eslint-disable @typescript-eslint/no-explicit-any */
import Badge from './components/Badge';
import Panel from './components/Panel';
import AddTaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ThemeToggleButton from './components/ThemeToggle';
import { filters } from './config/params';
import { useTaskStore } from './stores/TaskContext';

function App() {
  const { tasks, completedTasks, taskFilter, changeFilter } = useTaskStore();

  return (
    <main className="h-full bg-[var(--bg-color)]">
      <div className="h-full max-w-3xl mx-auto gap-10 md:py-6 px-0">
        <Panel>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl text-left font-bold my-2">Listado de tareas</h2>
              <div className="flex flex-col">
                <span className="text-sm">
                  {completedTasks.length}/{tasks.length} completadas
                </span>
              </div>
            </div>
            <ThemeToggleButton />
          </div>
          <AddTaskForm />
          <div className="flex flex-wrap gap-1 mt-4">
            {filters.map((filter: any) => {
              return (
                <Badge
                  key={filter.id}
                  active={filter.id === taskFilter}
                  onClick={() => changeFilter(filter)}
                >
                  {filter.label}
                </Badge>
              );
            })}
          </div>
          <TaskList />
        </Panel>
      </div>
    </main>
  );
}

export default App;
