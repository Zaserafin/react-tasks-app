import { PanelProps } from '../types';

export default function Panel(props: PanelProps) {
  const { heading, children } = props;

  return (
    <div className="h-full flex flex-col p-4 rounded-md shadow-2xl shadow-[var(--shadow-color)] text-white overflow-y-hidden">
      {heading && (
        <div className="flex flex-col items-start justify-between mb-2 md:flex-row">{heading}</div>
      )}
      {children}
    </div>
  );
}
