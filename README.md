# Task Manager - Full Stack Application

## Project Overview

This Task Manager is a full-stack web application built with a React frontend and Python FastAPI backend, designed to help users efficiently manage their tasks. The application provides a clean, intuitive interface for creating, viewing, and organizing tasks with categories and completion status.

## Features

- *Add Tasks*: Create new tasks with title and category fields
- *View Tasks*: Display all tasks in an organized list
- *Mark Completion*: Toggle task completion status with visual feedback (strike-through text)
- *Persistent Storage*: Tasks are stored in a SQLite database that persists between sessions
- *RESTful API*: Clean backend API with full CRUD operations
- *Responsive Design*: Modern React interface with dynamic updates

## Technology Stack

### Backend
- *Framework*: FastAPI (Python)
- *Database*: SQLite with direct sqlite3 integration
- *API*: RESTful endpoints with JSON responses

### Frontend
- *Framework*: React with Hooks (useState, useEffect)
- *HTTP Client*: Axios for API communication
- *Styling*: CSS with modern responsive design

## Project Structure


task-manager/
├── backend/
│   ├── main.py          # FastAPI application with routes
│   ├── tasks.db         # SQLite database (created automatically)
│   └── requirements.txt # Python dependencies
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js       # Main React component
    │   ├── App.css      # Application styles
    │   └── index.js     # React entry point
    ├── package.json     # Node.js dependencies
    └── README.md        # Frontend documentation


## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   bash
   cd backend
   

2. Create a virtual environment:
   bash
   python -m venv venv
   

3. Activate the virtual environment:
   - On Windows:
     bash
     venv\Scripts\activate
     
   - On macOS/Linux:
     bash
     source venv/bin/activate
     

4. Install required dependencies:
   bash
   pip install -r requirements.txt
   

5. Start the backend server:
   bash
   uvicorn main:app --reload
   
   
   The backend will be available at http://localhost:8000

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
   bash
   cd frontend
   

2. Install required dependencies:
   bash
   npm install
   

3. Start the development server:
   bash
   npm start
   
   
   The frontend will be available at http://localhost:3000

## API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | /tasks | Retrieve all tasks | None |
| POST | /tasks | Create a new task | {"title": "Task title", "category": "Category", "completed": false} |
| PUT | /tasks/{id} | Update a specific task | {"title": "Updated title", "category": "Updated category", "completed": true} |
| DELETE | /tasks/{id} | Delete a specific task | None |

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Use the input fields at the top to add a new task:
   - Enter a title for your task
   - Specify a category (e.g., Work, Personal, Shopping)
   - Click "Add Task" to create the task
3. View your tasks in the list below the form
4. Click "Mark Complete" to mark a task as completed
5. Completed tasks will appear with strike-through text
6. Click "Delete" to remove completed tasks

## Key Implementation Details

- *Backend*: Uses FastAPI with direct SQLite integration for simplicity and reliability
- *Frontend*: Implements React Hooks (useState, useEffect) for state management
- *Data Persistence*: SQLite database ensures tasks are saved between sessions
- *CORS Handling*: Backend configured to accept requests from the React frontend
- *Error Handling*: Comprehensive error handling on both frontend and backend

## Development Notes

- The application uses an in-process SQLite database, making it easy to set up and run
- No complex ORM layer is used, keeping dependencies minimal
- The frontend automatically updates when tasks are added, completed, or deleted
- The backend provides a complete REST API that could be extended with additional features

## Future Enhancements

Potential improvements for the application:
- User authentication and authorization
- Task categories with color coding
- Due dates and reminders
- Task prioritization
- Search and filtering capabilities
- Drag-and-drop task reorganization

This Task Manager application demonstrates modern full-stack development practices with a clean separation between frontend and backend components, providing a solid foundation for further development and feature expansion.