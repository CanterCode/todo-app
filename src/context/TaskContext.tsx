import { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { Task } from "../components/Task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (updatedTask: Task) => void;
  toggleSubtasks: (taskId: number, subtaskId: number) => void;
  addSubtask: (taskId: number, title: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const stored = localStorage.getItem("tasks");
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return parsed.map((task: any) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        subtasks: task.subtasks?.map((subtask: any) => ({
          ...subtask,
        })) || [],
      }));
    } catch (err) {
      console.error("Error loading tasks from localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const toggleSubtasks = (taskId: number, subtaskId: number) => {
    setTasks((prev) =>
      prev.map((task) => {
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
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;

        const newSubtask = {
          id: Date.now(),
          title,
          completed: false,
        };

        return {
          ...task,
          subtasks: task.subtasks ? [...task.subtasks, newSubtask] : [newSubtask],
        };
      })
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleSubtasks,
        addSubtask,
      }}
    >
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
