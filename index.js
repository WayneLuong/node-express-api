const express = require('express')
const path = require('path')
//Template engine
const exphbs = require('express-handlebars')
const membersData = require('./MembersData')

const logger = require('./middleware/logger')

const app = express()

//Basic web server
// app.get('/', (req, res) => {
//     //Send a response
//     //res.send('<h1>Hello World</h1>')

//     //Send a file
//     //res.sendFile(path.join(__dirname, 'public', 'index.html'))
// })

/*
    res.send
    res.json
    res.redirect
    res.render
    res.get
*/

//init middleware
app.use(logger)
//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //main.handlbars
app.set('view engine', 'handlebars')

/* -----------------HandleBars template engine section----------------------- */
//1: Set a template(views folder) for server to use: Homepage Route (handlebarss)
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App Title',
        members: membersData
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Member About Title',
        members: membersData
    })
})
/* --------------------------------------------------------------------------- */


//2: Set a static (public) folder for server to use (/ and /about)
//app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(` Server started on PORT ${PORT}`))
