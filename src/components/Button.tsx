import { ButtonProps } from '../types';

export default function Button(props: ButtonProps) {
  const { disabled = 'false', color = 'blue', children, onClick } = props;
  const disabledClassName = disabled ? ' disabled' : '';

  return (
    <button
      className={`w-8 h-8 transition-colors rounded-md ${color}${disabledClassName}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
