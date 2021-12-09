import './App.css';
import {useState} from "react";
import http from './utils/api/UsersApi'
import { JsonToTable } from 'react-json-to-table';
import "./components/global/style.css"


function App() {
    // Skapa TodoList
    const [toDo, setToDo] = useState()
    const [status, setStatus] = useState() // alluser
    const [assignedTo, setAssignedTo] = useState() // oneuser
    // Updatera TodoList
    const [toDoId, setToDoId ] = useState() // id - setID
    const [updateToDo, setUpdateToDo ] = useState() // name
    const [updateStatusToDo, setUpdateStatusTDo] = useState() // age
    const [updateAssignedTo, setUpdateAssignedTo] = useState()
    // Hämta all todoList
    const [allToDoUsers, setAllToDoUsers] = useState()
    // Radera todoList by ID
    const [id, setId] = useState()




 // Skapa todoList
    function createToDoUser(listTodo, listStatus, listAssignedTo) {
        const payload = {
            "todo": listTodo,
            "status": listStatus,
            "assignedTo":listAssignedTo
        }
        http.post('/toDoLists', payload)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


// Hämta all todoList
    function getAllToDoUsers() {
        http.get('toDoLists')
            .then( function (response) {
                console.log(response.data)
                setAllToDoUsers(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }


// Hämta to do user by Id
    function getToDoUserById(listId) {
        http.get(`/toDoLists/${ listId }`)
            .then(function (response) {
                console.log(response.data)
                setAssignedTo(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    // Updatera to do user

    function updateToDoUser(listId, listTodo, listStatus, listAssignedTo) {
        console.log(listId, listTodo, listStatus, listAssignedTo)
        const payload = {
            "id": listId,
            "todo": listTodo,
            "status": listStatus,
            "assignedTo": listAssignedTo
        }
        console.log(payload)
        http.put('/toDoLists', payload)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    // Radera to do user

    function deleteToDoUserById(listId) {
        http.delete(`/toDoLists/${ listId }`)
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div>
            <div >
                <section className='user-two'>
                    <h1>Bring allToDo</h1>
                    <button onClick={ getAllToDoUsers }><strong> Get All ToDoList</strong></button>
                    <br/>
                    <JsonToTable json={allToDoUsers}/>

                </section>
            </div>
            <div>
                <section className='user-three'>
                    <h1>Skapa ToDoList</h1>

                    <strong> ToDo</strong> <input type='text'
                           id='toDo'
                           value={ toDo }
                           placeholder="ToDo"
                           onChange={ event => setToDo(event.target.value) }/>
                <strong> Status </strong>  <input type='text'
                           id='status'
                           value={ status }
                           placeholder="status"
                           onChange={ event => setStatus(event.target.value) }/>

                  <strong>  AssignedTo </strong>  <input type='text'
                           id='AssignedTo'
                           value={ assignedTo }
                           placeholder="assignedTo"
                           onChange={ event => setAssignedTo(event.target.value) }/>
                    <br/>
                    <button onClick={ function () {
                        createToDoUser(toDo, status, assignedTo)
                    } }><strong>Create ToDoList</strong>
                    </button>


                </section>

                <section className='user-five'>
                    <h1>Update an ToDoList</h1>
                    <strong>  Id:</strong>  <input type='number'
                               id='id'
                               value={ toDoId }
                               onChange={ event => setToDoId(event.target.value) }/>


                    <strong> ToDo:</strong> <input type='text'
                                 id='name'
                                 value={ updateToDo }
                                 onChange={ event => setUpdateToDo(event.target.value) }/>


                    <strong> Status:</strong> <input type='text'
                                id='age'
                                value={ updateStatusToDo }
                                onChange={ event => setUpdateStatusTDo(event.target.value) }/>


                    <strong> AssignedTo: </strong><input type='text'
                                   id='gender'
                                   value={ updateAssignedTo }
                                   onChange={ event => setUpdateAssignedTo(event.target.value) }/>
                    <br/>

                    <button onClick={ function () {
                        updateToDoUser(toDoId, updateToDo, updateStatusToDo, updateAssignedTo)
                    } }><strong>Update ToDoList</strong>
                        <JsonToTable json={updateToDoUser}/>
                    </button>
                    <button onClick={ function () {
                        getToDoUserById(toDoId)
                    } }><strong>Get TodoById</strong>
                    </button>
                </section>


                <section className='last-user'>
                    <h1>Delete an ToDOList </h1>

                    Id: <input type='number'
                               id='id'
                               value={ id }
                               onChange={ event => setId(event.target.value) }/>
                    <br/>
                    <button onClick={ function () {
                        deleteToDoUserById(id)
                    } }>  <strong>Delete ToDoUser</strong>
                    </button>
                </section>

            </div>
        </div>
    );
}

export default App;