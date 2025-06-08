import { useTaskContext } from "../context/TaskContext";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useCreateModalContext } from "../context/CreateModalContext";
import CreateTaskModal from "../components/CreateTaskModal";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const { tasks, updateTask, removeTask, toggleSubtasks } = useTaskContext();
  const { showCreateModal, openCreateModal, closeCreateModal } =
    useCreateModalContext();
  const [expandedTaskIds, setExpandedTaskIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<"dueDate" | "priority">("dueDate");

  const sortedTasks = [...tasks].sort((a, b) => {
  if (sortBy === "dueDate") {
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    return dateA - dateB;
  }

  // Priority sorting
  const priorityRank: { [key: string]: number } = { high: 1, medium: 2, low: 3 };
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

      <Form.Group className="mb-3" controlId="sortBy">
        <Form.Label className="me-2">Sort Tasks By: </Form.Label>
        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "dueDate" | "priority")}
          style={{ width: "200px", display: "inline-block" }}
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </Form.Select>
      </Form.Group>

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
                <span
                  className={`form-check-label ${
                    task.completed
                      ? "text-decoration-line-through text-muted"
                      : ""
                  }`}
                >
                  {task.title}
                </span>
                <span
                  style={{
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    backgroundColor:
                      task.priority === "high"
                        ? "red"
                        : task.priority === "medium"
                        ? "orange"
                        : "#98FF98",
                    borderRadius: "2px",
                    marginLeft: "8px",
                  }}
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
              <small className="text-muted ms-4">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </small>
            )}

            {task.subtasks && task.subtasks.length > 0 && (
              <Button
                variant="link"
                size="sm"
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

            {task.subtasks && task.subtasks.length > 0 && (
              <div>
                {expandedTaskIds.includes(task.id) && (
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
