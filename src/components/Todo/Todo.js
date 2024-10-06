// Importing CSS styles specific to this component
import styles from "./todo.module.css";

// Importing custom context hook to access state and functions
import { useValue } from "../../context/TodoProvider";

export default function Todo(props) {

    // Destructuring properties from the todo object passed as a prop
    const { userId, id, title, completed } = props.todo;
    
    // Destructuring functions from the custom context hook
    const { openEditTodo, updateTodo, removeTodo } = useValue();

    // Event handler for updating the completed status of a todo item
    const handleCheckbox = (e) => {
        const newCompleted = e.target.checked;
        updateTodo(userId, id, title, newCompleted);
    }

    // Event handler for deleting a todo item
    const handleDelete = (id) => {
        removeTodo(id);
    }

    // Rendering the todo item with checkbox, title, and action buttons (edit and delete)
    return (
        <div className={styles.todoWrapper}>
            
            {/* Checkbox and title wrapper */}
            <div className={styles.checkboxWrapper}>
                <input 
                    type="checkbox" 
                    className={styles.checkbox} 
                    checked={completed} 
                    onChange={handleCheckbox} 
                />
                <div>
                    <div className={styles.text}>{title}</div>
                </div>
            </div>
            
            {/* Action buttons wrapper */}
            <div className={styles.actionWrapper}>

                {/* Delete button with SVG icon */}
                <div 
                    className={styles.delete} 
                    onClick={() => handleDelete(id)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="currentColor" 
                        className="bi bi-trash3-fill" 
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                </div>

                {/* Edit button with SVG icon */}
                <div 
                    className={styles.edit} 
                    onClick={() => openEditTodo(props.todo)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        fill="currentColor" 
                        className="bi bi-pen-fill" 
                        viewBox="0 0 16 16"
                    >
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                    </svg>
                </div>
            </div>

        </div>
    );
}
