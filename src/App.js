import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoInput from './TodoInput';

function App() {
  return (
    <div className="App">
     <h1>Todo List</h1>
     <TodoInput />
    </div>
  );
}

export default App;
