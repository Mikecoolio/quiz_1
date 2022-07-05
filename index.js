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

  res.locals.username = username;
  next();
})

const cluckrRouter = require('./routes/cluckr')
app.use('/cluckr', cluckrRouter)

app.get('/', (request, response) => {
    // response.send("<h1>Hello World</h1>")
    response.render('home')
})

const PORT = 5245
const HOST = 'localhost'
app.listen(PORT, HOST, () => {
  console.log(`The Cluckr server is listening at ${HOST}:${PORT}`);
})


