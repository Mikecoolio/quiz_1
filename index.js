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

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res, next) => {
    const username = req.cookies.username || '';

    if (username) {
        res.locals.username = username;
        console.log(`Cookies in use, ${username} has signed in!}`)
    }
    next();
})

const cluckrRouter = require('./routes/cluckr')
app.use('/cluckr', cluckrRouter)

app.get('/', (request, response) => {
    // response.send("<h1>Hello World</h1>")
    response.render('home')
})

app.get('/sign_in', (req, res) => {
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24
    const username = req.body.username
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    // res.redirect('/')
    res.render('sign_in')
})

// app.get('/sign_in', (req, res) => {
//     const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24
//     const username = req.body.username
//     res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
//     res.redirect('/')
// })

// app.post('/sign_out', (req, res) =>{
//     res.clearCookie('username')
//     res.redirect('/')
// })

const PORT = 5245
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
    console.log(`The Cluckr server is listening at ${HOST}:${PORT}`);
})


