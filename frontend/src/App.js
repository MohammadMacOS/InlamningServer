import './App.css';
import {useState} from "react";
import http from './utils/api/UsersApi'

function App() {
    const [user, setUser] = useState('User')

    function alive() {
        http.get('/')
            .then(function(response) {
                console.log(response.data)
            } )
            .catch(function (error) {
                console.log(error)
                return 'Error'
            })
            .then(function () {
                //always executed
                            })
    }

    function getUsers() {
        http.get('/users')
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function () {
                console.log(error)
            })

    }


  return (
      <div>
    <div className='user-one'>
      <h1>Homework </h1>
        <h1>How are you doing today ?</h1>
        <p>{ user }</p>
        <button onClick={ () => { setUser('new user') } }>New User </button>
        <button onClick={ alive }>Alive</button>
        <button onClick={ alive }>Alive</button>

    </div>
      </div>
  );
}

export default App;
