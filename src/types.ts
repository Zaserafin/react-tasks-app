export interface Filter {
  id: string;
  label: string;
  key: string;
  value: boolean;
  default: boolean;
}

export interface ButtonProps {
  color?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export interface BadgeProps {
  active?: boolean;
  children?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface PanelProps {
  heading?: React.ReactNode;
  children?: React.ReactNode;
}

export interface TaskItemProps {
  task: {
    id: string;
    name: string;
    completed: boolean;
  };
}

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface TaskContextProps {
  tasks: Task[];
  taskFilter: string;
  filteredTask: Task[];
  completedTasks: Task[];
  addTask: (newTask: string) => void;
  updateTask: (updatedTask: Task) => void;
  removeTask: (id: string) => void;
  completeTask: (id: string) => void;
  changeFilter: (filter: Filter) => void;
}
