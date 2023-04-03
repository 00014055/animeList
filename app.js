//CRUD operation and validation
const fs = require('fs')

const express = require('express')
const app = express()
const port = 3000

const path = "./data/animes.json"

const id = require('uniqid')

const { check, validationResult } = require('express-validator'); 

app.set('view engine', 'pug')
app.use('/static', express.static('public/styles'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
	let created = req.query.created

	let animes = getAll('animes')

	if (created) {
		res.render('list', {created:true, animes:animes })
	} else {
		res.render('list', {created:false, animes:animes})
	} 
})


app.get('/create', (req, res) => {
 	res.render('create', {})
})

//validation function was included here, but error "Cannot read properties of undefined (reading 'trim')" occured
app.post('/create', 
	check('name', 'must be at least 5 chars long' ).isLength({ min: 5 }),
	check('date')
		.isLength({ min: 5 })
		.withMessage('must be at least 5 chars long') ,
	check('type')
		.isLength({ min: 5 })
		.withMessage('must be at least 5 chars long') ,
	check('genres')
		.isLength({ min: 5 })
		.withMessage('must be at least 5 chars long') ,
	check('episodes')
		.isLength({ min: 5 })
		.withMessage('must be at least 5 chars long') ,
	check('comment')
		.isLength({ min: 10 })
		.withMessage('must be at least 10 chars long')  ,
	(req, res) => {
	let data = req.body

	// if (data.anime.trim() == '') {
	// 	fs.readFile('./data/animes.json', (err, data) => {
	// 		if (err) throw err

	// 		const animes = JSON.parse(data)

	// 		res.render('list', { error: true, animes:animes})
	// })

	let anime = {
		id: id(),
		name: data.name,
		date: data.date,
		type: data.type,
		genres: data.genres,
		episodes: data.episodes,
		comment: data.comment,
	}


	const errors = validationResult(req);

	let animes = getAll('animes')

	animes.push(anime)

	writeAll('animes', animes)

	res.redirect('/?created=true')
})



app.get('/update', (req, res) => {
 	res.render('/update', {})
})

app.get('/:id/update', (req, res) => {
	const id = req.params.id

	fs.readFile('./data/animes.json', (err, data) => {
		if (err) throw err

		const animes = JSON.parse(data)

		const filteredAnime = animes.filter(anime => anime.id == id)

		fs.writeFile('./data/animes.json', JSON.stringify(filteredAnime), (err) => {
			if (err) throw err

			res.render('update', { animes: anime})

		})
	})
})

// app.get('/:id/update', (req, res) => {
// 	const id = req.params.id

// 	fs.readFile('./data/animes.json', (err, data) => {
// 		if (err) throw err


// 		const animes = JSON.parse(data)
// 		const anime = animes.filter(anime => anime.id == id) [0]
// 		const animeIdx = animes.indexOf(anime)
// 		const splicedAnime = animes.splice(animeIdx, 1)[0]

// 		splicedAnime.watched = true

// 		animes.push(splicedAnime)

// 		fs.writeFile('./data/animes.json', JSON.stringify(animes), (err) => {
// 			if (err) throw err

// 			res.render('list', { animes: animes })
// 		})

			

// 	})
// })



//delete
app.get('/:id', (req, res) => {
	const id = req.params.id

	fs.readFile('./data/animes.json', (err, data) => {
		if (err) throw err

		const animes = JSON.parse(data)

		const filteredAnimes = animes.filter(anime => anime.id != id)

		fs.writeFile('./data/animes.json', JSON.stringify(filteredAnimes), (err) => {
			if (err) throw err

			res.render('list', { animes: filteredAnimes, deleted: true })

		})
	})
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getAll(filename) {
	return JSON.parse(fs.readFileSync(path))
}

function writeAll(filename, data) {
	return fs.writeFileSync(path, JSON.stringify(data))
}