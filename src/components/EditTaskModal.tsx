import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTaskContext } from "../context/TaskContext";
import type { Task, Subtask } from "../components/Task";

interface Props {
  show: boolean;
  handleClose: () => void;
  task: Task | null;
}

const EditTaskModal: React.FC<Props> = ({ show, handleClose, task }) => {
  const { updateTask } = useTaskContext();

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [dueDate, setDueDate] = useState("");
  const [subTasks, setSubTasks] = useState<Subtask[]>([]);
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>(
    {}
  );

  // Load data into form when modal opens or task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority);
      setDueDate(
        task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
      );
      setSubTasks(task.subtasks || []);
    }
  }, [task]);

  // Subtask helpers
  const addSubtask = () => {
    setSubTasks((prev) => [
      ...prev,
      { id: Date.now(), title: "", completed: false },
    ]);
  };

  const updateSubtaskTitle = (id: number, newTitle: string) => {
    setSubTasks((prev) =>
      prev.map((st) => (st.id === id ? { ...st, title: newTitle } : st))
    );
  };

  const toggleSubtaskCompletion = (id: number) => {
    setSubTasks((prev) =>
      prev.map((st) =>
        st.id === id ? { ...st, completed: !st.completed } : st
      )
    );
  };

  const removeSubtask = (id: number) => {
    setSubTasks((prev) => prev.filter((st) => st.id !== id));
  };

  const validateForm = () => {
    const newErrors: { title?: string; dueDate?: string } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (dueDate && isNaN(new Date(dueDate).getTime())) {
      newErrors.dueDate = "Invalid due date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (!task || typeof task.id !== "number") return;

    const updatedTask: Task = {
      ...task,
      id: task.id,
      title,
      description,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      subtasks: subTasks,
    };

    updateTask(updatedTask);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Priority */}
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

          {/* Subtasks */}
          <Form.Group className="mb-3">
            <Form.Label className="d-block">Subtasks:</Form.Label>
            <div className="mb-2">
              <Button variant="secondary" size="sm" onClick={addSubtask}>
                + Add Subtask
              </Button>
            </div>
            {subTasks.map((subtask, idx) => (
              <div key={subtask.id} className="d-flex mb-2">
                <Form.Control
                  type="text"
                  placeholder={`Subtask ${idx + 1}`}
                  value={subtask.title}
                  onChange={(e) =>
                    updateSubtaskTitle(subtask.id, e.target.value)
                  }
                  className="me-2"
                />
                <Form.Check
                  type="checkbox"
                  checked={subtask.completed}
                  onChange={() => toggleSubtaskCompletion(subtask.id)}
                  className="me-2 mt-2"
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

          {/* Due Date */}
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              isInvalid={!!errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dueDate}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTaskModal;
