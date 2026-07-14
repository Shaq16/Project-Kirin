import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from './store';

interface CardProps {
  task: Task;
}

export function Card({ task }: CardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-[#1C1C1E] border border-white/5 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:bg-[#252527] transition-colors"
    >
      <p className="text-sm font-semibold text-stone-200 mb-1">{task.title}</p>
      <p className="text-xs text-stone-400 font-medium">{task.subtitle}</p>
    </div>
  );
}
