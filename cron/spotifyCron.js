const db = require('../services/trackDb');
const spotifyService = require('../services/spotifyService');

/**
 * 
 */
async function init() {
    // Get the tracks for Spotify
    const tracks = await db.getActiveSpotify();
    // Ids already collected in db
    const idsSaved = tracks.map(track => track.id);

    tracks.forEach(async (track) => {
        const query = track.artist ? `${track.artist} ${track.track}` : `${track.track}`;
        const response = await spotifyService.getSpotifyResults(`${query}`);
        const data = response
            .filter(result => !idsSaved.includes(result.id))
            .map(result => computeResults(result));
        data.forEach(async result => await saveNewResultTrack(result, track.id));
    });
}

/**
 * Save the track for the id in db
 * @param {Object} track 
 * @param {String} id 
 */
async function saveNewResultTrack(track, id) {
    await db.addResultTrack(track, id);
}

/**
 * Filter the data and return the definitive db format 
 * @param {Object} track 
 * @returns {Object}
 */
function computeResults(track) {
    const artists = track.artists.map((artist) => artist.name).join(',');

    let result =
    {
        'plateform': 'Spotify',
        'artists': artists,
        'name': track.name,
        'url': track.external_urls.spotify,
        'id': track.id,
        'timestamp': Date.now()
    }
    if (track.album) {
        result.images = track.album.images[0].url;
    }
    return result;
}

module.exports = { init };
