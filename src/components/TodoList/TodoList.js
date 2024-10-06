// Importing CSS styles specific to this component
import styles from "./todoList.module.css";

// Importing the Todo component
import Todo from "../Todo/Todo";

// Importing custom context hook to access state and functions
import { useValue } from "../../context/TodoProvider";

export default function TodoList() {

    // Destructuring the todos array from the custom context hook
    const { todos } = useValue();

    // Rendering the list of todos
    return (
        <div className={styles.list}>
            {
                // Mapping over the todos array and rendering each Todo component
                todos.map((todo, index) => {
                    return (
                        // Each Todo component is wrapped in a div with a unique key
                        <div key={index}>
                            <Todo todo={todo} />
                        </div>
                    );
                })
            }
        </div>
    );
}
