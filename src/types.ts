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
  onClick?: (filter: Filter) => void;
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
