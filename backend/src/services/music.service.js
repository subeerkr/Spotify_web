const musicModel = require('../models/music.model');

async function createMusic(data) {
    const music = await musicModel.create(data);
    return music;
}

module.exports = { createMusic };
