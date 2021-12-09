import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: '*',
    methods: ['GET','POST', 'PUT', 'DELETE']
}))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Here is database relaterat.
let currentToDoId = 14


let toDoInDatabase = [
    {
        id: 20,
        todo: 'Clean',
        status: 'Completed',
        assignedTo: 'Frank',
    },
    {
        id: 21,
        todo: 'Homework',
        status: 'Completed',
        assignedTo: 'Camilla',
    },
    {
        id: 22,
        todo: 'Buy food',
        status: 'Not completed',
        assignedTo: 'Suzan',
    },
    {
        id: 23,
        todo: 'Sleep early',
        status: 'Not completed',
        assignedTo: 'Alexander',
    },
]

function incrementToDoCurrentIdByOne() {
    currentToDoId += 1
}


// Svarskommunikation from API
function toDoMessageNotFound() {
    return {
        status: 404,
        text: 'toDoList not found!'
    }
}

function toDoMessageSuccess(message) {
    return {
        status: 200,
        text: message
    }
}


//search in database.
function getToDoIndex(id) {
    console.log(typeof (id))
    for (let i = 0; i <  toDoInDatabase.length; i++) {
        if ( toDoInDatabase[i].id === Number(id) ){
            return i
        }
    }
    return -1
}

// CRUD = Create Read Update Delete
function createNewToDo(todoData) {
    let ListToDo = {
        id: currentToDoId,
       todo: todoData.todo,
        status: todoData.status,
        assignedTo: todoData.assignedTo,
    }
    incrementToDoCurrentIdByOne()
    toDoInDatabase.push(ListToDo)
}

function getAllToDo() {
    return  toDoInDatabase
}

function getToDoById(id) {
    let index = getToDoIndex(id)

    if (index === -1) {
        return toDoMessageNotFound()
    } else {
        return toDoMessageSuccess( toDoInDatabase[index])
    }
}

function updateToDo(todoData) {
     console.log(todoData)
    let index = getToDoIndex(todoData.id)

    if (index === -1) {
        console.log('Could not find id')
        return toDoMessageNotFound()
    } else {
        if ( toDoInDatabase[index].todo !== todoData.todo) {
            toDoInDatabase[index].todo = todoData.todo
        }
        if ( toDoInDatabase[index].status !== todoData.status) {
            toDoInDatabase[index].status = todoData.status
        }
        if (toDoInDatabase[index].assignedTo !== todoData.assignedTo) {
            toDoInDatabase[index].assignedTo = todoData.assignedTo
        }

        return toDoMessageSuccess('ToDoList updated!')
    }
}

function deleteToDo(index) {
    toDoInDatabase.splice(index, 1)
}



function deleteToDoById(id) {
    let index = getToDoIndex(id)

    if (index === -1) {
        return toDoMessageNotFound()
    } else {
        deleteToDo(index)
        return toDoMessageSuccess('ToDo deleted!')
    }
}

//Check that API is alive ?
app.get('/', function (req, res) {
    res.send('API ToDo is Alive!')
})

//API CRUD
app.post('/toDoLists', function (req, res) {
    createNewToDo(req.body)
    res.json('Successfully created a new ToDo')
})

app.get('/toDoLists', function (req, res) {
    res.json(getAllToDo())
})

app.get('/toDoLists/:id', function (req, res) {
    const id = Number(req.params.id)
    let response = getToDoById(id)
    res.status(response.status).json(response.text)
})


app.put('/toDoLists', function (req, res) {
    let response = updateToDo(req.body)
    res.status(response.status).send(response.text)
})

app.delete('/toDoLists/:id', function (req, res) {
    let response = deleteToDoById(Number(req.params.id))
    res.status(response.status).send(response.text)
});

//Start the server
app.listen(port, () => {
    console.log(`The server is running on port ${ port }`);
})










