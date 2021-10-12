const express = require('express');
const router = express.Router();
const trackDb = require('../services/trackDb');
const userDb = require('../services/userDb');

// POST track query
router.post('/track', async (req, res, next) => {
    const track = req.body;
    const user_id = req.user_id;
    // save track
    track.user = user_id;
    track.active = true;
    track.created = Date.now();
    await trackDb.storeTrack(track);
    res.status(201).json(track);
});

// GET user data
router.get('/me', async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const user = await userDb.getUser(user_id);
        if (user === undefined) {
            return res.status(404).json({message: 'No user'});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Something gone wrong' });
    }
});

// POST user
router.post('/me', async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const user = await trackDb.addNewUser(user_id, { user_id, try: 'trzerezre' });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something gone wrong' });
    }
});

// GET user tracks
router.get('/me/tracks', async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const user = await trackDb.getAllTracksFromUser(user_id);
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something gone wrong' });
    }
});

router.get('/test', async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const user = await trackDb.getSpotify(user_id, { user_id, try: 'trzerezre' });
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something gone wrong' });
    }
});

module.exports = router;
