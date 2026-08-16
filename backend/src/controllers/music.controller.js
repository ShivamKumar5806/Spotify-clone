const musicModel = require('../model/music.model');
const albumModel = require('../model/album.model');
const jwt = require("jsonwebtoken");
const { uplodeFile } = require('../services/storage.service');

async function createMusic(req, res) {
    const token = req.cookies.token;
    const title = req.body.title;
    const file = req.file;
    // console.log(req.cookies);
    // console.log(req.cookies.token);

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "you don't have permission to create music"
            })
        }

    } catch (error) {
        console.log("error:", error)
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    

    const result = await uplodeFile(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: decoded.id
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist
        }
    })
}


async function createAlbum(req, res){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message: "you don't have permission to create album"
            })
        }

        const {title, musics} = req.body;

        const album = await albumModel.create({
            title,
            music: musics,
            artist: decoded.id
        })
        res.status(201).json({
            message: "Album created successfully",
            album: {    
                id: album._id,
                title: album.title,
                music: album.music,
                artist: album.artist
            }
        })

    } catch (error) {
        console.log("error:", error)
        return res.status(401).json({message: "Unauthorized"})
    }
}

async function getAllMusics(req, res){

    const musics = await musicModel.find().populate("artist", "username email");

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics,
    })
}

module.exports = { createMusic, createAlbum, getAllMusics }