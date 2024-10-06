// Importing necessary hooks, axios for HTTP requests, and toast for notifications
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Creating a context for the Todo application
const TodoContext = createContext();

// Custom hook to access the TodoContext
export function useValue() {
    return useContext(TodoContext);
}

// Provider component to wrap around the application and provide state and functions
export default function TodoProvider({ children }) {

    // State variables for managing todos and loading status
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState(null);
    const [editTodoObj, setEditTodoObj] = useState(null);
    const [editTodo, setEditTodo] = useState(null);
    const [deleteTodo, setDeleteTodo] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetching todos when the component first mounts
    useEffect(() => {
        setLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(function (response) {
                setTodos(response.data);
            })
            .catch(function (error) {
                console.error(error);
                toast.error(error.message);
            })
            .finally(function () {
                setLoading(false);
            });
    }, []);

    // Creating a new todo when newTodo is set
    useEffect(() => {
        if (newTodo) {
            setLoading(true);
            axios.post('https://jsonplaceholder.typicode.com/todos', {
                userId: 1,
                title: newTodo,
                completed: false
            })
                .then(function (response) {
                    setTodos([response.data, ...todos]);
                    toast.success("Todo created successfully");
                })
                .catch(function (error) {
                    console.error(error);
                    toast.error(error.message);
                })
                .finally(function () {
                    setLoading(false);
                    setNewTodo(null);
                });
        }
    }, [newTodo, todos]);

    // Updating a todo when editTodo is set
    useEffect(() => {
        if (editTodo) {
            setLoading(true);
            axios.put(`https://jsonplaceholder.typicode.com/todos/${editTodo.id}`, editTodo)
                .then(function (response) {
                    setTodos(todos.map(todo => todo.id === editTodo.id ? response.data : todo));
                    toast.success("Todo updated successfully");
                })
                .catch(function (error) {
                    console.error(error);
                    toast.error(error.message);
                })
                .finally(function () {
                    setLoading(false);
                    setEditTodo(null);
                });
        }
    }, [editTodo, todos]);

    // Deleting a todo when deleteTodo is set
    useEffect(() => {
        if (deleteTodo) {
            setLoading(true);
            axios.delete(`https://jsonplaceholder.typicode.com/todos/${deleteTodo}`)
                .then(function () {
                    setTodos(todos.filter(todo => todo.id !== deleteTodo));
                    toast.success("Todo deleted successfully");
                })
                .catch(function (error) {
                    console.error(error);
                    toast.error(error.message);
                })
                .finally(function () {
                    setLoading(false);
                    setDeleteTodo(null);
                });
        }
    }, [deleteTodo, todos]);

    // Functions to set states for creating, updating, and deleting todos
    const createTodo = (todo) => {
        if (todo) {
            setNewTodo(todo);
        }
    }

    const updateTodo = (userId, id, title, completed) => {
        setEditTodo({ userId, id, title, completed });
    }

    const removeTodo = (id) => {
        setDeleteTodo(id);
    }

    // Function to open edit mode with a specific todo object
    const openEditTodo = (todo) => {
        setEditTodoObj(todo);
    }

    // Function to cancel edit mode
    const cancelEditTodo = () => {
        setEditTodoObj(null);
    }

    // Context value object to provide access to state and functions
    const todoValue = {
        loading,
        todos,
        editTodoObj,
        cancelEditTodo,
        openEditTodo,
        createTodo,
        updateTodo,
        removeTodo
    };

    // Wrapping children components with the TodoContext.Provider
    return (
        <TodoContext.Provider value={todoValue}>
            {children}
        </TodoContext.Provider>
    );
}
