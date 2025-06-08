import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { Task } from "../components/Task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
  toggleSubtask: (taskId: number, subtaskId: number) => void;
  addSubtask: (taskId: number, title: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const removeTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const toggleSubtask = (taskId: number, subtaskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId || !task.subtasks) return task;

        const updatedSubtasks = task.subtasks.map((subtask) =>
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        );

        return { ...task, subtasks: updatedSubtasks };
      })
    );
  };

  const addSubtask = (taskId: number, title: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;
        const newSubtask = {
          id: Date.now(),
          title,
          completed: false,
        };
        return {
          ...task,
          subtasks: task.subtasks
            ? [...task.subtasks, newSubtask]
            : [newSubtask],
        };
      })
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask, toggleSubtask, addSubtask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
