const {ImageKit} = require('@imagekit/nodejs');

const imagekitClint = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint : process.env.URL_ENDPOINT
})

async function uplodeFile(file){
    const result = await imagekitClint.files.upload({
        file,
        fileName : "music_"+ Date.now(),
        folder: "yt-complete-backend/music"
    });
    return result;
}

module.exports = {uplodeFile}

