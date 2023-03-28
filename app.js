const express = require('express')
const app = express()
const port = 3000

//const fs = require('fs')

app.set('view engine', 'pug') 
app.use('/static', express.static('public/styles'))
//app.use(express.urlencodded({exttended:false}))


// http://localhost:3000
app.get('/', (req, res) => {
	res.render('index')
  //let clients = JSON.parse(fs.readFileSync(./data/clients/JSON))

  //res.send('list', {clients:clients})
})

//app.get('/add',(req, res) => {
//	res.render('form')
//})

//app.('/add',(req, res) => {
//	res.render('form')
//})

app.listen(port, (err) => {
	if (err) throw err

  	console.log(`Example app listening on port ${port}`)
})