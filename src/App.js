// Importing the main CSS file for the app
import './App.css';

// Importing components for the To-Do form and To-Do list
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

// Importing the custom hook `useValue` from the context provider
import { useValue } from './context/TodoProvider';

// Importing BarLoader for showing a loading spinner
import { BarLoader } from 'react-spinners';

// Importing ToastContainer from react-toastify for displaying toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // Extracting the `loading` state from the custom context hook
  const { loading } = useValue();

  // Defining CSS override styles for the BarLoader
  const override = {
    display: "block",
    marginBottom: "30px",
    width: "50%"
  };

  // Rendering the main structure of the App component
  return (

    <div className="container">
      {/* Header for the To-Do List */}
      <div className='heading'>TodoList</div>

      {/* Component to add new to-dos */}
      <TodoForm />

      {/* Conditionally rendering BarLoader while loading, else rendering the To-Do list */}
      {loading ? <BarLoader color="#6370f0" cssOverride={override} /> : <TodoList />}

      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>

  );
}

// Exporting the App component as the default export
export default App;
