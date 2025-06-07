import { useTaskContext } from "../context/TaskContext";
import { useCreateModal } from "../context/CreateModalContext";
import CreateTaskModal from "../components/CreateTaskModal";
import { format } from "date-fns";

const Dashboard = () => {
  const { tasks, updateTask, removeTask } = useTaskContext();
  const { showCreateModal, openCreateModal, closeCreateModal } = useCreateModal();

  const toggleComplete = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask({ ...task, completed: !task.completed });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Your Current Tasks</h2>
        <button className="btn btn-primary" onClick={openCreateModal}>
          + Create Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks yet. Start by creating one!</p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                task.completed ? "text-decoration-line-through text-muted" : ""
              }`}
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <div>
                  <h5 className="mb-1">{task.title}</h5>
                  <span
                    className={`badge bg-${getPriorityColor(task.priority)} me-2`}
                  >
                    {task.priority}
                  </span>
                  {task.dueDate && (
                    <small className="text-muted">
                      Due: {format(new Date(task.dueDate), "MMM d, yyyy")}
                    </small>
                  )}
                </div>
              </div>
              <div>
                <button className="btn btn-sm btn-outline-secondary me-2">View</button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <CreateTaskModal show={showCreateModal} handleClose={closeCreateModal} />
    </div>
  );
};

export default Dashboard;