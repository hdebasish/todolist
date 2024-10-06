import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoProvider from './context/TodoProvider';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
  </React.StrictMode>
);

