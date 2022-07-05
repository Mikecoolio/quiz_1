const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())

const methodOverride = require('method-override');

app.use(methodOverride((req, res) => {
    if (req.body && req.body.__method) {
        const method = req.body.__method
        return method
    }
}))

app.use(express.urlencoded({extended: true}))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    const username = req.cookies.username
    //res.locals are properties set and are available in any views
    //almost like a global variable
    res.locals.username = '';

    if(username){
        res.locals.username = username;
    }
    next();
})

const cluckrRouter = require('./routes/cluckr')
app.use('/cluckr', cluckrRouter)

app.get('/', (request, response) => {
    // response.send("<h1>Hello World</h1>")
    response.render('home')
})

app.get('/sign_in', (request, response) => {
    response.render('sign_in')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.post(('/process_sign_in'), (req, res) => {
    const username = req.body.username

    if (username) {
        console.log("Cookie username: ", username)
        res.cookie('username', username)
        res.redirect('index')
    } else {
        res.redirect('sign_in')
    }
})

app.get('/sign_out', (req, res) => {
    res.clearCookie('username')
    res.redirect('/sign_in')
})

const PORT = 5245
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
    console.log(`The Cluckr server is listening at ${HOST}:${PORT}`);
})


