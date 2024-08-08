import { BadgeProps } from '../types';

export default function Badge(props: BadgeProps) {
  const { active, children } = props;
  const activeClassName = active ? ' active' : '';

  return <button className={`badge ${activeClassName}`}>{children}</button>;
}
