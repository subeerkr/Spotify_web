const ImageKit = require("@imagekit/nodejs");
const ImagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function upLoadFile(file) {
    const result = await ImagekitClient.upload({
        file: file,
        fileName: "music_" + Date.now(),
        folder: "yt-complete-backend/music"
    });
    return result;
}

module.exports = { ImagekitClient, upLoadFile };