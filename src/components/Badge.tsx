import { BadgeProps } from '../types';

export default function Badge(props: BadgeProps) {
  const { active, children, onClick } = props;
  const activeClassName = active ? ' active' : '';

  return (
    <button className={`badge ${activeClassName}`} onClick={onClick}>
      {children}
    </button>
  );
}
