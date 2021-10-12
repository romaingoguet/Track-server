const db = require('../services/trackDb');
const deezerService = require('../services/deezerService');

async function init() {
    // Get the tracks for Spotify
    const tracks = await db.getActiveDeezer();
    // Ids already collected in db
    const idsSaved = tracks.map(track => track.id);

    tracks.forEach(async (track) => {
        const query = track.artist ? `${track.artist} ${track.track}` : `${track.track}`;
        const response = await deezerService.getDeezerResults(`${query}`);
        const data = response
            .filter(result => !idsSaved.includes(result.id))
            .map(result => computeResults(result));
        data.forEach(async result => await saveNewResultTrack(result, track.id));
    });
}

/**
 * Filter the data and return the definitive db format 
 * @param {Object} track 
 * @returns 
 */
 function computeResults(track) {
    let result =
    {
        'plateform' : 'Deezer',
        'artists': track.artist.name,
        'name': track.title,
        'url': track.link,
        'id': track.id,
        'timestamp': Date.now(),
        'images' : track.album.cover_big
    }

    return result;
}

/**
 * Save the track for the id in db
 * @param {Object} track 
 * @param {String} id 
 */
 async function saveNewResultTrack(track, id) {
    await db.addResultTrack(track, id);
}

module.exports = { init };
