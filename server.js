var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var idCount = 1;

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get('/api/todos', function(req,res) {

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(todoList));    //Can also do res.json({})
});

// GET /api/todos/:id
app.get('/api/todos/:id', function(req,res) {
    let id = req.params.id;

    if(todoList[id])
    {    
        let item = todoList[id];

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(item));    //Can also do res.json({})
    }
    else 
    {
        res.status(404).send('Item Not Found');
    }
});

// POST /api/todos
app.post('/api/todos', function (req, res)
{
    let todo = req.body.todo;

    if(todo)
    {
        idCount++;

        let data = {
            id: idCount,
            todo: todo
        };

        todoList.push(data);
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));    //Can also do res.json({})
    }
    else 
    {
        res.status(412).send('Todo item is required to POST.');  
    }
});

// PUT /api/todos/:id
app.put('/api/todos/:id', function(req,res) {

    let id = req.params.id;
    let todo = req.body.todo;

    if(todoList[id] && todo)
    {
        todoList[id].todo = todo;

        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todoList[id]));    //Can also do res.json({})
    }
    else if(!todo)
    {
        res.status(404).send('TODO is required in PUT.');  
    }
    else 
    {
        res.status(404).send('Item not Found.'); 
    }

});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', function(req,res)
{
    let id = req.params.id;

    if(todoList[id])
    {
        //Start At Id, and then delete
        //Does not include the end which is 1.
        //Returns what was deleted
        let deletedItem = todoList.slice(id,1);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(deletedItem));    //Can also do res.json({})
    }
    else 
    {
        res.status(404).send('Item not Found.'); 
    }
});

app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})