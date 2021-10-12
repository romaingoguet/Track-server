const admin = require('./admin');
const db = admin.db;

/**
 * Store requested track
 * @param {Object} track 
 */
async function storeTrack(track) {
    const save = await db.collection('tracks').doc();
    track.id = save.id;
    save.set(track);
}

/**
 * 
 * @param {String} user_id 
 * @returns {Array}
 */
async function getAllTracksFromUser(user_id) {
    const query = await db.collection('tracks')
        .where('user', '==', user_id)
        .get();
    let data = [];
    query.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}


/**
 * Return all the active Spotify track queries
 * @returns {Object}
 */
async function getActiveSpotify() {
    const query = await db.collection('tracks')
        .where('plateforms', 'array-contains', 'Spotify')
        .where('active', '==', true)
        .get();
    let data = [];
    query.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

/**
 * Return all the active Deezer track queries
 * @returns {Object}
 */
 async function getActiveDeezer() {
    const query = await db.collection('tracks')
        .where('plateforms', 'array-contains', 'Deezer')
        .where('active', '==', true)
        .get();
    let data = [];
    query.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
}

/**
 * 
 * @param {Object} track 
 * @param {String} id 
 */
async function addResultTrack(track, id) {
    console.log(id);
    const trackRef = await db.collection('tracks').doc(id);
    trackRef.update({
        active: false,
        results: admin.FieldValue.arrayUnion(track)
    });
}

module.exports = {
    storeTrack,
    getAllTracksFromUser,
    getActiveSpotify,
    addResultTrack,
    getActiveDeezer
};