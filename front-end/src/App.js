import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8000/tasks');
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks. Please check if the server is running.');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (title.trim() === '') {
      setError('Please enter a task title');
      return;
    }
    
    setError('');
    try {
      const newTask = {
        id: 0,
        title,
        category: category.trim() || 'Uncategorized',
        completed: false
      };
      
      const response = await axios.post('http://localhost:8000/tasks', newTask);
      setTasks([...tasks, response.data]);
      setTitle('');
      setCategory('');
    } catch (error) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', error);
    }
  };

  const markComplete = async (taskId) => {
    setError('');
    try {
      const taskToUpdate = tasks.find(task => task.id === taskId);
      const updatedTask = { ...taskToUpdate, completed: true };
      
      const response = await axios.put(`http://localhost:8000/tasks/${taskId}`, updatedTask);
      
      setTasks(tasks.map(task => 
        task.id === taskId ? response.data : task
      ));
    } catch (error) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    const category = task.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {});

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedTasks).sort();

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>Organize your tasks efficiently</p>
        </header>
        
        <div className="task-form card">
          <h2>Add New Task</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Task title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Category (optional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onKeyPress={handleKeyPress}
              className="form-input"
            />
            <button onClick={addTask} className="add-btn">
              ➕ Add Task
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="tasks-container">
          <div className="tasks-header">
            <h2>Your Tasks ({tasks.length})</h2>
            {tasks.length > 0 && (
              <button onClick={fetchTasks} className="refresh-btn">
                🔄 Refresh
              </button>
            )}
          </div>

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p>No tasks yet. Add your first task above!</p>
            </div>
          ) : (
            <div className="categories-list">
              {sortedCategories.map(category => (
                <div key={category} className="category-group">
                  <div 
                    className="category-header"
                    onClick={() => toggleCategory(category)}
                  >
                    <span className="category-name">{category}</span>
                    <span className="category-count">
                      ({groupedTasks[category].length})
                    </span>
                    <span className="dropdown-arrow">
                      {expandedCategories[category] ? '▼' : '►'}
                    </span>
                  </div>
                  
                  {expandedCategories[category] && (
                    <div className="tasks-under-category">
                      {groupedTasks[category].map(task => (
                        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                          <div className="task-content">
                            <h3 className="task-title">{task.title}</h3>
                            <div className="task-status">
                              {task.completed && (
                                <span className="completed-indicator">✓ Completed</span>
                              )}
                            </div>
                          </div>
                          <div className="task-actions">
                            {!task.completed ? (
                              <button 
                                onClick={() => markComplete(task.id)} 
                                className="complete-btn"
                              >
                                ✅ Complete
                              </button>
                            ) : (
                              <span className="completed-badge">Done</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;