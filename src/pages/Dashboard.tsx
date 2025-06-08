import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useCreateModalContext } from "../context/CreateModalContext";
import CreateTaskModal from "../components/CreateTaskModal";

const getPriorityColor = (priority: "low" | "medium" | "high") => {
  switch (priority) {
    case "high":
      return "text-danger"; // red
    case "medium":
      return "text-warning"; // orange/yellow
    case "low":
      return "text-secondary"; // gray
    default:
      return "";
  }
};

const priorityRank = {
  high: 1,
  medium: 2,
  low: 3,
};

const Dashboard = () => {
  const { tasks, updateTask, removeTask } = useTaskContext();
  const { showCreateModal, openCreateModal, closeCreateModal } =
    useCreateModalContext();
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;

    if (dateA !== dateB) return dateA - dateB;
    return priorityRank[a.priority] - priorityRank[b.priority];
  });

  const toggleComplete = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask({ ...task, completed: !task.completed });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Your Current Tasks</h2>
        <Button onClick={openCreateModal}>+ Create Task</Button>
      </div>

      {sortedTasks.map((task) => (
        <Card key={task.id} className="mb-3">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="me-3"
                  style={{ listStyleType: "none" }}
                />
                <span>{task.title}</span>
<span
  className={`priority-rectangle ${
    task.priority === "high"
      ? "bg-danger"
      : task.priority === "medium"
      ? "bg-warning"
      : "bg-secondary"
  }`}
/>
                  {task.title}
                </span>
              </div>

              <div>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() =>
                    setExpandedTaskId(
                      task.id === expandedTaskId ? null : task.id
                    )
                  }
                >
                  View Details
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            </div>

            {task.dueDate && (
              <small className="text-muted ms-4">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <>
                <Button
                  variant="link"
                  size="sm"
                  className="ms-4 mt-2 p-0"
                  onClick={() =>
                    setExpandedTaskId(
                      task.id === expandedTaskId ? null : task.id
                    )
                  }
                >
                  {expandedTaskId === task.id
                    ? "Hide Subtasks"
                    : "View Subtasks"}
                </Button>

                {expandedTaskId === task.id && (
                  <div className="ms-4 mt-2">
                    {task.subtasks.map((subtask) => (
                      <div className="form-check mb-1" key={subtask.id}>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={subtask.completed}
                          readOnly
                        />
                        <label className="form-check-label ms-2">
                          {subtask.title}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      ))}

      <CreateTaskModal show={showCreateModal} handleClose={closeCreateModal} />
    </div>
  );
};

export default Dashboard;
