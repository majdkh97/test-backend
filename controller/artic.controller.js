'use strict';
const axios = require('axios'); // require the package
const { ArticModel, artPieceModel } = require('../models/arctic.model')


const getArtData = async (req, res) => {
    await axios.get('https://api.artic.edu/api/v1/artworks').then(response => {
        const responseData = response.data.data.map(item => {
            return new ArticModel(item);
        })
        res.send(responseData);
    })
        .catch(error => console.log(error))
}

const createFavoriteArtPiece = async (req, res) => {
    const {
        title,
        thumbnail,
        artist_name,
        description
    } = req.body;

    artPieceModel.find({title:title},(error,data)=>{
        if(data.length > 0){
            res.send('data already exists')
        }
        else{
            const newArtPiece = new artPieceModel({
                title: title,
                thumbnail: thumbnail,
                artist_name: artist_name,
                description: description
            })
            newArtPiece.save();
            res.send(newArtPiece);
        }
    })
}

const getFavoriteArtPiece = async (req,res) =>{
    artPieceModel.find({},(error,data)=>{
        if(error){
            res.send(error)
        }
        else{
           res.send(data) 
        }
    })
}

const deleteFavoriteArtPiece = async(req,res) =>{
    const idx = req.params.idx;

    artPieceModel.find({},(error,data)=>{
        if(error){
            res.send(error)
        }
        else{
            data[idx].remove();
            artPieceModel.find({},(error,data)=>{
                if(error){
                    res.send(error)
                }
                else{
                   res.send(data) 
                }
            })
        }
    })
}

const updateFavoriteArtPiece = async(req,res) =>{
    const idx = req.params.idx;
    const {
        title,
        thumbnail,
        artist_name,
        description
    } = req.body;

    artPieceModel.find({},(error,data)=>{
        if(error){
            res.send(error);
        }
        else{
            data[idx].title=title;
            data[idx].thumbnail=thumbnail;
            data[idx].artist_name=artist_name;
            data[idx].description=description;

            data[idx].save();
            res.send(data);
        }
    })
}

module.exports = { getArtData , createFavoriteArtPiece , getFavoriteArtPiece , deleteFavoriteArtPiece , updateFavoriteArtPiece}