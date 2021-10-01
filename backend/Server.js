import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
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
        name: 'Frank',
        age: 25,
        gender: 'Male',
    },
    {
        id: 21,
        name: 'Camilla',
        age: 30,
        gender: 'Female',
    },
    {
        id: 22,
        name: 'Suzan',
        age: 40,
        gender: 'Female',
    },
    {
        id: 23,
        name: 'Alexander',
        age: 50,
        gender: 'Male',
    },
]

function incrementToDoCurrentIdByOne() {
    currentToDoId += 1
}


// Svarskommunikation from API
function toDoMessageNotFound() {
    return {
        status: 404,
        text: 'toDoUsers not found!'
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
    for (let i = 0; i <  toDoInDatabase.length; i++) {
        if ( toDoInDatabase[i].id === id) {
            return i
        }
    }
    return -1
}

// CRUD = Create Read Update Delete
function createNewToDo(todoData) {
    let user = {
        id: currentToDoId,
        name: todoData.name,
        age: todoData.age,
        gender: todoData.gender,
    }
    incrementToDoCurrentIdByOne()
    toDoInDatabase.push(user)
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
    let index = getToDoIndex(todoData.id)

    if (index === -1) {
        return toDoMessageNotFound()
    } else {
        if ( toDoInDatabase[index].name !== todoData.name) {
            toDoInDatabase[index].name = todoData.name;
        }
        if ( toDoInDatabase[index].age !== todoData.age) {
            toDoInDatabase[index].age = todoData.age
        }
        if (toDoInDatabase[index].gender !== todoData.gender) {
            toDoInDatabase[index].gender = todoData.gender
        }

        return toDoMessageSuccess('ToDo updated!')
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
        return toDoMessageSuccess('User deleted!')
    }
}

//Check that API is alive ?
app.get('/', function (req, res) {
    res.send('API ToDo is Alive!')
})

//API CRUD
app.post('/toDoUsers', function (req, res) {
    createNewToDo(req.body)
    res.json('Successfully created a new ToDo user')
})

app.get('/toDoUsers', function (req, res) {
    res.json(getAllToDo())
})

app.get('/toDoUsers/:id', function (req, res) {
    const id = Number(req.params.id)
    let response = getToDoById(id)
    res.status(response.status).json(response.text)
})


app.put('/toDoUsers', function (req, res) {
    let response = updateToDo(req.body)
    res.status(response.status).send(response.text)
})

app.delete('/toDoUsers/:id', function (req, res) {
    let response = deleteToDoById(Number(req.params.id))
    res.status(response.status).send(response.text)
});

//Start the server
app.listen(port, () => {
    console.log(`The server is running on port ${ port }`)
})

