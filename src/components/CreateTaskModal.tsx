import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useTaskContext } from "../context/TaskContext";
import { useUser } from "../context/UserContext";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const CreateTaskModal: React.FC<Props> = ({ show, handleClose }) => {
  const { addTask } = useTaskContext();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [subtasks, setSubtasks] = useState<
    { id: number; title: string; completed: boolean }[]
  >([]);
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // Basic validation
    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (dueDate && new Date(dueDate) < new Date(new Date().toDateString())) {
      setError("Due date cannot be in the past.");
      return;
    }

    try {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        priority,
        userId: user?.id || "",
        dueDate: dueDate ? new Date(dueDate) : undefined,
        subtasks: subtasks.filter((subtask) => subtask.title.trim() !== ""),
      };

      addTask(newTask);
      resetForm();
      handleClose();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("low");
    setSubtasks([]);
    setDueDate("");
    setError("");
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now(), title: "", completed: false }]);
  };

  const updateSubtaskTitle = (id: number, newTitle: string) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, title: newTitle } : subtask
      )
    );
  };

  const removeSubtask = (id: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        handleClose();
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional task details"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Priority*</Form.Label>
            <Form.Select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="d-block">Subtasks:</Form.Label>
            <div className="mb-2">
              <Button variant="secondary" size="sm" onClick={addSubtask}>
                + Add Subtask
              </Button>
            </div>
            {subtasks.map((subtask, index) => (
              <div key={subtask.id} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  placeholder={`Subtask ${index + 1}`}
                  value={subtask.title}
                  onChange={(e) =>
                    updateSubtaskTitle(subtask.id, e.target.value)
                  }
                  className="me-2"
                />
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeSubtask(subtask.id)}
                >
                  ✕
                </Button>
              </div>
              
            ))}
          </Form.Group>

          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // restrict past dates
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            resetForm();
            handleClose();
          }}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
