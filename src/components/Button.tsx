import { ButtonProps } from '../types';

export default function Button(props: ButtonProps) {
  const { disabled = false, color = 'blue', children, onClick } = props;
  const disabledClassName = disabled ? ' disabled' : '';

  return (
    <button className={`button ${color}${disabledClassName}`} onClick={onClick}>
      {children}
    </button>
  );
}
