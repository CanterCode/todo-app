import { useParams, Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditTaskModal from "../components/EditTaskModal";
import { useEditModalContext } from "../context/EditModalContext";
import "../styles/TaskDetails.css";

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, removeTask, toggleSubtasks, updateTask } = useTaskContext();
  const navigate = useNavigate();

  const { showEditModal, openEditModal, closeEditModal } =
    useEditModalContext();

  const taskId = parseInt(id || "", 10);
  const task = tasks.find((t) => t.id === taskId);

  const taskCompleted = (task: { completed: boolean }) => {
    return task.completed ? "Completed" : "Not Completed";
  };

  if (!task) return <p>Task not found.</p>;

  return (
    <Container fluid className="mt-4 task-details-page">
      <Row>
        {/* Left Sidebar */}
        <Col md={3} className="sidebar-section">
          <h5 className="mb-3 back-link">
            <Link to="/" className="text-decoration-none">
              ← View All Tasks
            </Link>
          </h5>
          <ListGroup className="task-list-group">
            {tasks.map((t) => (
              <ListGroup.Item
                key={t.id}
                as={Link}
                to={`/details/${t.id}`}
                action
                className={`task-list-item ${t.id === taskId ? "active" : ""}`}
              >
                {t.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Main Task Detail View */}
        <Col md={9} className="task-main-card">
          <Card className="task-card">
            <Card.Header className="task-header">
              <h4 className="task-title">{task.title}</h4>
            </Card.Header>
            <Card.Body className="task-body">
              <p className="task-description">
                <strong>Description:</strong>{" "}
                {task.description || "No description provided."}
              </p>

              <p className="task-status">
                <strong>Status: </strong>
                <span
                  className={`badge ${
                    task.completed ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {taskCompleted(task)}
                </span>
              </p>

              <p className="task-priority">
                <strong>Priority:</strong>{" "}
                <span className="text-capitalize">{task.priority}</span>
                <span
                  className={`priority-indicator ${
                    task.priority === "high"
                      ? "priority-high"
                      : task.priority === "medium"
                      ? "priority-medium"
                      : "priority-low"
                  }`}
                />
              </p>

              <p className="task-due-date">
                <strong>Due Date:</strong>{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "None"}
              </p>

              {task.subtasks && task.subtasks.length > 0 && (
                <>
                  <h5 className="subtask-title mt-4"><strong>Subtasks:</strong></h5>
                  <ListGroup className="subtask-list mb-3">
                    {task.subtasks.map((subtask) => (
                      <ListGroup.Item key={subtask.id} className="subtask-item">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                          checked={subtask.completed}
                          onChange={() => toggleSubtasks(task.id, subtask.id)}
                        />
                        <span
                          className={
                            subtask.completed
                              ? "text-decoration-line-through text-muted"
                              : ""
                          }
                        >
                          {subtask.title}
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </>
              )}

              <div className="task-buttons d-flex justify-content-end gap-2">
                <Button
                  variant={task.completed ? "secondary" : "success"}
                  className="me-2"
                  onClick={() =>
                    updateTask({ ...task, completed: !task.completed })
                  }
                >
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </Button>
                <Button
                  onClick={openEditModal}
                  variant="warning"
                  className="me-2"
                >
                  Edit Task
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    removeTask(task.id);
                    navigate("/");
                  }}
                >
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <EditTaskModal
        show={showEditModal}
        handleClose={closeEditModal}
        task={task}
      />
    </Container>
  );
};

export default TaskDetails;
