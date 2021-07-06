'use strict';

const mongoose = require('mongoose');

//schema for our model 
const artPieceSchema = mongoose.Schema({
    title : String,
    thumbnail: String,
    artist_name: String,
    description: String
})

//model our schema
const artPieceModel = mongoose.model('favorites',artPieceSchema)

class ArticModel{
    constructor(data){
        this.title = data.title;
        this.thumbnail = data.thumbnail.lqip;
        this.artist_name = data.artist_title;
        this.description  = data.credit_line;
    }
}



module.exports = {ArticModel,artPieceModel};