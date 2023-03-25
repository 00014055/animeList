const express = require('express')
const app = express()
const port = 3000

const fs = require('fs')

app.set('view engine', 'pug')
app.use(express.urlencodded({exttended:false}))

app.get('/', (req, res) => {
  let clients = JSON.parse(fs.readFileSync(./data/clients/JSON))

  res.send('list', {clients:clients})
})

app.get('/add',(req, res) => {
	res.render('form')
})

app.('/add',(req, res) => {
	res.render('form')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})