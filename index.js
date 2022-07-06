const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

const cluckrRouter = require('./routes/cluckr');
const { request } = require('http');
app.use('/cluckr', cluckrRouter)

app.get('/clucks', (req, res) => {
    res.render('clucks')
})

app.get('/', (request, response) => {
    response.redirect('clucks')
})

app.get('/sign_in', (request, response) => {
    response.render('sign_in', {username: request.cookies.username})
})


app.get('/new', (req, res) => {
    res.render('new')
})

app.post(('/process_sign_in'), (req, res) => {
    const username = req.body.username
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24

    if (username) {
        console.log("Cookie username: ", username)
        res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
        res.redirect('clucks')
    } else {
        res.redirect('sign_in')
    }
})

app.get(('/new_cluck'), (req, res) => {
    let username = req.cookies.username || '' 

    if (username != '' && username != undefined) {
        res.render('clucks/new')
    } else {
        res.redirect('sign_in')
    }
})

app.get('/submit_cluck', (req, res) => {
    clucks = req.body
    console.log("clucks inside submit_cluck", clucks)
    // unsure of where the request came from, from here
    res.redirect('clucks')
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


