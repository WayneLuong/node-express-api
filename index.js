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


/*
    res.send([body]) - send string/object/array/buffer
    res.json() - return json data
    res.redirect('/about') - redirect to a page
    res.render(index) - send the rendered view to the client e.g. index.html
        // if a callback is specified, the rendered HTML string has to be sent explicitly
        res.render('index', function (err, html) {
          res.send(html)
        })
    res.status(404)
    res.get('Content-Type') - Returns the HTTP response header specified by field. The match is case-insensitive. // => "text/plain"
    res.set('Content-Type', 'text/html')
    res.type('.html')
    res.end - end without sending response
*/
/*
    req.body
    res.params - if you have the route /user/:name, then the “name” property is available as req.params.name
    req.query.q //GET /search?q=tobi+ferret // => 'tobi ferret'
    req.path // => '/users' // example.com/users?sort=desc
    req.get('Content-Type') // => "text/plain"

*/
