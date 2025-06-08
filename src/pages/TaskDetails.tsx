import { useParams, Link } from "react-router-dom";
import { useTaskContext } from "../context/TaskContext";
import { Container, Row, Col, Button, Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, removeTask, toggleSubtasks } = useTaskContext();
  const navigate = useNavigate();


  const taskId = parseInt(id || "", 10);
  const task = tasks.find((t) => t.id === taskId);

  if (!task) return <p>Task not found.</p>;

  return (
    <Container fluid className="mt-4">
      <Row>
        {/* Left Sidebar */}
        <Col md={3}>
          <h5 className="mb-3">
            <Link to="/" className="text-decoration-none">
              ← View All Tasks
            </Link>
          </h5>
          <ListGroup>
            {tasks.map((t) => (
              <ListGroup.Item
                key={t.id}
                as={Link}
                to={`/details/${t.id}`}
                action
                className={t.id === taskId ? "active" : ""}
              >
                {t.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Main Task Detail View */}
        <Col md={9}>
          <Card>
            <Card.Header>
              <h4>{task.title}</h4>
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Description:</strong>{" "}
                {task.description || "No description provided."}
              </p>
              <p>
                <strong>Priority:</strong>{" "}
                <span className="text-capitalize">{task.priority}</span>
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "None"}
              </p>

              {task.subtasks && task.subtasks.length > 0 && (
                <>
                  <h5 className="mt-4">Subtasks</h5>
                  <ListGroup className="mb-3">
                    {task.subtasks.map((subtask) => (
                      <ListGroup.Item key={subtask.id}>
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

              <div className="d-flex justify-content-end gap-2">
                <Button variant="warning">Edit Task</Button>
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
    </Container>
  );
};

export default TaskDetails;
