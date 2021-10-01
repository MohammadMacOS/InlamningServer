import './App.css';
import {useState} from "react";
import http from './utils/api/UsersApi'
import { JsonToTable } from 'react-json-to-table';
import "./components/global/style.css"


function App() {
    const [text, setText] = useState('ToDo')
    const [allUsers, setAllUsers] = useState()
    const [oneUser, setOneUser] = useState()
    const [id, setId] = useState()
    const [name, setName] = useState()
    const [age, setAge] = useState()
    const [gender, setGender] = useState()


    function alive() {
        http.get('/')
            .then(function (response) {
                console.log(response.data)
                setText(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error)
                return 'Error'
            })
            .then(function () {
                // always executed
            })
    }

    function getUsers() {
        http.get('/toDoUsers')
            .then(function (response) {
                console.log(response.data)
                setAllUsers(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function getUserById(userId) {
        http.get(`/toDoUsers/${ userId }`)
            .then(function (response) {
                console.log(response.data)
                setOneUser(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function createUser(userName, userAge, userGender) {
        const payload = {
            "name": userName,
            "age": userAge,
            "gender": userGender
        }
        http.post('/toDoUsers', payload)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function updateUser(userId, userName, userAge, userGender) {
        console.log(userId, userName, userAge, userGender)
        const payload = {
            "id": userId,
            "name": userName,
            "age": userAge,
            "gender": userGender
        }
        console.log(payload)
        http.put('/toDoUsers', payload)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function deleteUserById(userId) {
        http.delete(`/toDoUsers/${ userId }`)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <div className='user-one'>
                <h1>Homework</h1>
                <p>{ text }</p>

                <button onClick={ () => {
                    setText('New ToDo')
                } }>New ToDo
                </button>
                <button onClick={ alive }>alive</button>
                <button onClick={ getUsers }>get ToDoUsers</button>
                <button onClick={ function () {
                    getUserById(id)
                } }>getToDoUserById
                </button>
                <button onClick={ function () {
                    createUser('name', "age", 'gender')
                } }>create ToDoUser
                </button>
                <button onClick={ function () {
                    updateUser('userId', 'userName', 'userAge', 'userGender')
                } }>updateUser
                </button>
                <button onClick={ function () {
                    deleteUserById(id)
                } }>deleteToDoById
                </button>
            </div>
            <div>
                <section className='user-two'>
                    <h1>Bring allToDo</h1>
                    <button onClick={ getUsers }>getUsers</button>
                    <br/>
                    <JsonToTable json={allUsers}/>
                </section>

                <section className='user-three'>
                    <h1>Bring an ToDoUser</h1>
                    Id: <input type='number'
                               id='id'
                               value={ id }
                               onChange={ event => setId(event.target.value) }/>
                    <button onClick={ function () {
                        getUserById(id)
                    } }>getUser</button>
                    <br/>
                    <JsonToTable json={oneUser}/>
                </section>

                <section className='user-four'>
                    <h1>Create an ToDoUser</h1>

                    Name: <input type='text'
                                 id='name'
                                 value={ name }
                                 onChange={ event => setName(event.target.value) }/>
                    <br/>

                    Age: <input type='number'
                                id='age'
                                value={ age }
                                onChange={ event => setAge(Number(event.target.value)) }/>
                    <br/>

                    Gender: <input type='text'
                                   id='gender'
                                   value={ gender }
                                   onChange={ event => setGender(event.target.value) }/>
                    <br/>

                    <button onClick={ function () {
                        createUser(name, age, gender)
                    } }>Create ToDoUser
                    </button>
                </section>

                <section className='user-five'>
                    <h1>Update an ToDoUser</h1>

                    Id: <input type='number'
                               id='id'
                               value={ id }
                               onChange={ event => setId(event.target.value) }/>
                    <br/>

                    Name: <input type='text'
                                 id='name'
                                 value={ name }
                                 onChange={ event => setName(event.target.value) }/>
                    <br/>

                    Age: <input type='number'
                                id='age'
                                value={ age }
                                onChange={ event => setAge(event.target.value) }/>
                    <br/>

                    Gender: <input type='text'
                                   id='gender'
                                   value={ gender }
                                   onChange={ event => setGender(event.target.value) }/>
                    <br/>

                    <button onClick={ function () {
                        updateUser(id, name, age, gender)
                    } }>Update ToDo
                    </button>
                </section>

                <section className='last-user'>
                    <h1>Delete an ToDO </h1>

                    Id: <input type='number'
                               id='id'
                               value={ id }
                               onChange={ event => setId(event.target.value) }/>
                    <br/>

                    <button onClick={ function () {
                        deleteUserById('id')
                    } }>Delete ToDoUser
                    </button>
                </section>

            </div>
        </div>
    );
}

export default App;