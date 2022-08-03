const express = require('express');
const Joi=require('joi'); //for validation
const app = express();
app.use(express.json());

const books = [
    { title: "harry porter", id: 1 },
    { title: "twilight", id: 2 },
    {title:"Lorien Legacies", id: 3 },
]

//READ request handlers
app.get('/', (req, res) => {
    res.send('Welcome to Edureka REST API with node.js tutorial!');
});

app.get('/api/books/', (req, res) => {
    res.send(books);
});

app.get('/api/books/:id', (req, res) => {
    const book = books.find(c.id === parseInt(req.params.id));

if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(book);    
});


//CREATE request handler
app.post('/api/books', (res, req) => {
    const { error } = validateBook(req.body);
    if (error)
    {
        res.status(400).send(error.details[0].message)
        return;
    }
    const book = {
        id: books.length + 1,
        title: req.body.title
    };
    books.push(book);
    res.send(book);
});

//UPDATE request handler
app.put('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = validateBook(req.body);
    if (error)
    {
        res.status(404).send(error.details[0].message);
        return;
    }
    book.title = req.body.title;
    res.send(book);

});

//DELETE request handler
app.delete('/api/books/:id', (req, res) => {
    const book = books.find(c => c.id === parseInt(req.params.id));
    if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>');
    
    const index = book.indexOf(book);
    books.splice(index, 1);

    res.send(book);
});

function validateBook(book) {
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(book,schema);
}

//PORT env variable
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${ port }..`))