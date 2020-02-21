//run 'nodemon' for continuous build :-) 
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('is running dude'))

app.listen(port, () => console.log(`dab on em we listenin on port ${port}`))