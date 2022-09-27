import { createContext, ReactNode } from 'react';

interface Task {
  id: string;
  userId: string;
  name: string;
  description?: string;
  time: Date | null;
  done: boolean;
  createdAt: Date;
}

interface TaskContextData {
  tasks: Task[];
}

const TaskContext = createContext({});

interface TaskContentProviderProps {
  children: ReactNode;
}

export function TaskContentProvider({ children }: TaskContentProviderProps) {
  return <TaskContext.Provider value={{}}>{children}</TaskContext.Provider>;
}
