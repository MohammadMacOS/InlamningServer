import './App.css';
import {useState} from "react";

function App() {
    const [user, setUser] = useState('User')
  return (
    <div className='user-one'>
      <h1>Homework </h1>
        <h1>How are you doing today ?</h1>
        <p>{ user }</p>
        <button onClick={ () => { setUser('new user') } }>New User </button>

    </div>
  );
}

export default App;
