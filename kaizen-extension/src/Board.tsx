import { DndContext } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { useStore } from './store';
import { Column } from './Column';

export function Board() {
  const { columns, tasks, moveTask } = useStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // active.id is the taskId, over.id is the columnId
      moveTask(active.id as string, over.id as string);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 h-[60vh] min-h-[400px]">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={tasks.filter((task) => task.columnId === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
