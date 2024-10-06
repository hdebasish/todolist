// Importing CSS styles specific to this component
import styles from "./todoForm.module.css";

// Importing custom context hook to access state and functions
import { useValue } from "../../context/TodoProvider";

// Importing React hooks and toast notifications
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

export default function TodoForm() {

    // Destructuring functions and editTodoObj from the custom context hook
    const { editTodoObj, cancelEditTodo, createTodo, updateTodo } = useValue();

    // State for the title of the todo item
    const [title, setTitle] = useState("");

    // useEffect hook to set the title state based on editTodoObj
    useEffect(() => {
        if (editTodoObj) {
            setTitle(editTodoObj.title);
        } else {
            setTitle("");
        }
    }, [editTodoObj]);

    // Handler for updating title state when input changes for creating a todo
    const handleCreateTodoInput = (e) => {
        setTitle(e.target.value);
    }

    // Handler for updating title state when input changes for editing a todo
    const handleUpdateTodoInput = (e) => {
        setTitle(e.target.value);
    }

    // Handler for submitting the form to create a new todo
    const handleCreateTodoForm = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            toast.error('Please enter a title for your todo');  // Show error if title is empty
            return;
        }
        createTodo(title);  // Call createTodo with the entered title
        setTitle("");  // Clear the title input field
    }

    // Handler for submitting the form to update an existing todo
    const handleUpdateTodoForm = (e) => {
        e.preventDefault();
        if (title.trim() === "") {
            toast.error('Please enter a title for your todo');  // Show error if title is empty
            return;
        }
        // Call updateTodo with the edited values
        updateTodo(editTodoObj.userId, editTodoObj.id, title, editTodoObj.completed);
        setTitle("");  // Clear the title input field
        cancelEditTodo();  // Cancel edit mode
    }

    // If in edit mode, render the update form
    if (editTodoObj) {
        return (
            <form className={styles.form} onSubmit={handleUpdateTodoForm}>
                <input 
                    style={{ width: "55%" }} 
                    type="text" 
                    placeholder="Enter your todo" 
                    value={title} 
                    onChange={handleUpdateTodoInput} 
                />
                <button type="submit">Update Todo</button>
                <button 
                    style={{ backgroundColor: "grey" }} 
                    onClick={cancelEditTodo}
                >
                    Cancel
                </button>
            </form>
        );
    }

    // Render the form for creating a new todo if not in edit mode
    return (
        <form className={styles.form} onSubmit={handleCreateTodoForm}>
            <input 
                style={{ width: "75%" }} 
                type="text" 
                value={title} 
                placeholder="Enter your todo" 
                onChange={handleCreateTodoInput} 
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}
