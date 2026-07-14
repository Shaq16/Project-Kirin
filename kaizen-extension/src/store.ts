import { create } from 'zustand';

export type Task = {
  id: string;
  title: string;
  subtitle: string;
  columnId: string;
};

export type Column = {
  id: string;
  title: string;
  dotColor: string;
};

type StoreState = {
  tasks: Task[];
  columns: Column[];
  moveTask: (taskId: string, toColumnId: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  columns: [
    { id: 'new', title: 'NEW', dotColor: 'bg-stone-400' },
    { id: 'oa', title: 'OA', dotColor: 'bg-yellow-500' },
    { id: 'interview', title: 'INTERVIEW', dotColor: 'bg-emerald-500' },
    { id: 'offer', title: 'OFFER', dotColor: 'bg-stone-500' },
  ],
  tasks: [
    { id: 't1', title: 'Campus Drive — Atlassian', subtitle: 'Today', columnId: 'new' },
    { id: 't2', title: 'HackerRank - Round 1', subtitle: '2d left', columnId: 'oa' },
    { id: 't3', title: 'Systems Design — L2', subtitle: 'Tomorrow, 4:00 PM', columnId: 'interview' },
    { id: 't4', title: 'HR Round — Zeta Labs', subtitle: 'Fri', columnId: 'interview' },
    { id: 't5', title: 'Backend Intern — Nimbus', subtitle: 'Respond by Mon', columnId: 'offer' },
  ],
  moveTask: (taskId, toColumnId) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, columnId: toColumnId } : task
      ),
    })),
}));
