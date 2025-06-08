export interface Subtask {
    id: number;
    title: string;
    completed: boolean;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    userId: string;
    dueDate?: Date;
    subtasks?: Subtask[];
}