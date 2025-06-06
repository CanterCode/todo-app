import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../components/Task';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (id: number) => void;
    updateTask: (updatedTask: Task) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const removeTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
    };

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, removeTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}