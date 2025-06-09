# 📝 Cander Task Manager

Cander is a full-featured task management web application built with React and TypeScript. It allows users to create, edit, delete, and organize tasks and subtasks with priorities, due dates, and completion tracking.

This project was created for the purposes of completing the Coding Temple Front End Specialization Module 1 Knowledge Check.

---

## 🚀 Features

- ✅ User authentication with Auth0
- ✅ Create, edit, and delete tasks and subtasks
- ✅ Track task completion status
- ✅ Sort tasks by due date or priority
- ✅ Subtasks management with visual indicators
- ✅ Responsive UI with custom styling
- ✅ Completed tasks move to the bottom and are visually distinct
- ✅ GitHub-linked source code for transparency

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, React Router, Bootstrap
- **Auth:** Auth0 for secure login/logout
- **State Management:** React Context API
- **Styling:** Bootstrap 5 + Custom CSS
- **Backend:** _Not connected yet – frontend-only_  
  (Easily extensible to include a backend with Node.js/Express and a database like MongoDB)

---

## 🧱 Project Structure

src/
├── components/ # Reusable UI components (NavBar, TaskCard, etc.)
├── context/ # UserContext for authentication state
├── pages/ # Dashboard, TaskDetails, Login, etc.
├── styles/ # Custom CSS files
├── modals/ # Modal components like CreateTaskModal, EditTaskModal
├── types/ # TypeScript interfaces and types
├── App.tsx # App root with routing
└── index.tsx # Entry point

---

## 📄 Usage

1. **Log in** using your Auth0 credentials.
2. On the **Dashboard**, you can:
   - Create new tasks with a title, description, due date, and priority.
   - Toggle completion for tasks and subtasks.
   - View all active tasks at the top and completed tasks at the bottom.
   - Use the “Sort By” dropdown to reorder by due date or priority.
   - Click “View Details” to open a detailed task view with all subtasks and edit/delete options.
3. On the **Task Details** page:
   - See the full task description, due date, and priority.
   - Toggle the completion status of subtasks.
   - Edit or delete the task using the action buttons.
4. Use the **logout** button on the top right to securely log out of your session.

---

## 💡 Future Improvements
- 🗃️ Backend integration for persistent data
- 📱 Mobile app version
- 🗓️ Calendar or timeline view
- 🔔 Notifications & reminders
- 🧑‍🤝‍🧑 Team collaboration

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you’d like to change.



## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
2. Install Dependencies
Make sure you have Node.js and npm installed (Node.js 16+ recommended).

bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy
Edit
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_API_BASE_URL=http://localhost:5000
Replace the placeholders with your actual Auth0 and backend config.

4. Start the Development Server
bash
Copy
Edit
npm run dev
The app should now be running at http://localhost:5173

5. Backend API (Optional)
If you're using a custom backend (e.g., Express), ensure it's running on the same base URL as defined in VITE_API_BASE_URL.

bash
Copy
Edit
cd backend/
npm install
npm run start
