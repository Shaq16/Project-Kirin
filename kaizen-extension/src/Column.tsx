import { useDroppable } from '@dnd-kit/core';
import { useStore } from './store';
import type { Column as ColumnType, Task } from './store';
import { Card } from './Card';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
}

export function Column({ column, tasks }: ColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div
      className={`flex flex-col w-64 h-full transition-colors ${
        isOver ? 'opacity-80' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4 px-1">
        <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
        <h2 className="text-[13px] font-bold tracking-wide text-stone-400 uppercase">{column.title}</h2>
      </div>
      
      <div ref={setNodeRef} className="flex-1 overflow-y-auto kanban-scrollbar space-y-3 pb-4 min-h-[100px]">
        {tasks.map((task) => <Card key={task.id} task={task} />)}
      </div>
    </div>
  );
}
