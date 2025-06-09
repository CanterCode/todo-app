import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useCreateModalContext } from "../context/CreateModalContext";
import CreateTaskModal from "../components/CreateTaskModal";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const { tasks, updateTask, removeTask, toggleSubtasks } = useTaskContext();
  const { showCreateModal, openCreateModal, closeCreateModal } =
    useCreateModalContext();
  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("dueDate");

  const sortedTasks = [...tasks]
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return (
          new Date(a.dueDate || "").getTime() -
          new Date(b.dueDate || "").getTime()
        );
      } else if (sortBy === "priority") {
        const priorityMap = { high: 1, medium: 2, low: 3 };
        return priorityMap[a.priority] - priorityMap[b.priority];
      }
      return 0;
    })
    .sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  const toggleComplete = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      updateTask({ ...task, completed: !task.completed });
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4 dashboard-header">
        <h2 className="dashboard-title">Your Current Tasks</h2>
        <Button onClick={openCreateModal} className="create-btn">
          + Create Task
        </Button>
      </div>

      <Form.Group className="mb-3 sort-group" controlId="sortBy">
        <Form.Label className="me-2">Sort Tasks By:</Form.Label>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "dueDate" | "priority")}
          className="sort-select"
          style={{ width: "150px", display: "inline-block" }}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </Form.Select>
      </Form.Group>

      {sortedTasks.map((task) => (
        <Card key={task.id} className="task-card mb-3">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="me-3"
                />
                <span
                  className={`form-check-label task-title ${
                    task.completed ? "completed" : ""
                  }`}
                >
                  <strong>{task.title}</strong>
                </span>
                <span
                  className={`priority-indicator ${
                    task.priority === "high"
                      ? "priority-high"
                      : task.priority === "medium"
                      ? "priority-medium"
                      : "priority-low"
                  }`}
                />
              </div>

              <div>
                <Link to={`/details/${task.id}`}>
                  <Button variant="secondary" size="sm" className="me-2">
                    View Details
                  </Button>
                </Link>
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
              <small className="text-muted due-date">
                <em>Due: {new Date(task.dueDate).toLocaleDateString()}</em>{" "}
              </small>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <Button
                variant="link"
                size="sm"
                className="toggle-subtasks-btn"
                onClick={() =>
                  setExpandedTaskIds((prev) =>
                    prev.includes(task.id)
                      ? prev.filter((id) => id !== task.id)
                      : [...prev, task.id]
                  )
                }
              >
                {expandedTaskIds.includes(task.id)
                  ? "Hide Subtasks"
                  : "View Subtasks"}
              </Button>
            )}

            {task.subtasks &&
              task.subtasks.length > 0 &&
              expandedTaskIds.includes(task.id) && (
                <div className="ms-4 mt-2">
                  {task.subtasks.map((subtask) => (
                    <div className="form-check mb-1" key={subtask.id}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={subtask.completed}
                        onChange={() => toggleSubtasks(task.id, subtask.id)}
                      />
                      <label
                        className={`form-check-label ms-2 ${
                          subtask.completed
                            ? "text-decoration-line-through text-muted"
                            : ""
                        }`}
                      >
                        {subtask.title}
                      </label>
                    </div>
                  ))}
                </div>
              )}
          </Card.Body>
        </Card>
      ))}

      <CreateTaskModal show={showCreateModal} handleClose={closeCreateModal} />
    </div>
  );
};

export default Dashboard;
