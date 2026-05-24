const musicService = require('../services/music.service');
const { upLoadFile } = require('../services/storage.service');
const jwt = require('jsonwebtoken');

async function createMusic(req, res) {
   try {
      const token = req.cookies.token;
      if (!token) {
         return res.status(401).json({ message: 'Unauthorized' })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.role !== 'artist') {
         return res.status(403).json({ message: 'You don\'t have permission to perform this action' })
      }

      const { title } = req.body;
      const file = req.file;
      if (!file) {
         return res.status(400).json({ message: 'No file uploaded' })
      }

      const result = await upLoadFile(file.buffer.toString('base64'))
      const music = await musicService.createMusic({
         uri: result.url,
         title,
         artist: decoded.id,
      })

      return res.status(201).json({ message: 'Music created successfully',
         music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
         }
      })
   } catch (err) {
      console.error(err)
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
         return res.status(401).json({ message: 'Unauthorized' })
      }
      return res.status(500).json({ message: 'Internal server error' })
   }
}

module.exports = {createMusic}
