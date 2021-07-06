const express = require('express') // require the express package
const app = express() // initialize your express app instance

const cors = require('cors');
app.use(cors()) // after you initialize your express app instance
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


const { getArtData , createFavoriteArtPiece , getFavoriteArtPiece , deleteFavoriteArtPiece , updateFavoriteArtPiece } = require('./controller/artic.controller')
app.get('/art', getArtData)

// CRUD endpoints

app.post('/art/favorite', createFavoriteArtPiece);

app.get('/art/favorite', getFavoriteArtPiece);

app.delete('/art/favorite/:idx', deleteFavoriteArtPiece);

app.put('/art/favorite/:idx', updateFavoriteArtPiece);


// a server endpoint 
app.get('/', // our endpoint name
    function (req, res) { // callback function of what we should do with our request
        res.send('Hello World') // our endpoint function response
    })

app.listen(PORT) // kick start the express server to work