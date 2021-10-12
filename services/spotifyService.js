const axios = require('axios');

/**
 * 
 * @param {String} query 
 * @returns {Object}
 */
async function getSpotifyResults(query) {
    // todo: find a way to store token and use it if still valid
    const token = await getSpotifyToken();
    const results = await fetchSpotifyResults(query, token);
    return results;
}


/**
 * Get auth token from Spotify
 * @returns {String}
 */
async function getSpotifyToken() {
    // init url encoded
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        params,
        {
            auth: {
                username: '0651bb7090514715832e650ec2bf07fb', // TODO: set ids in .env
                password: '6952644ef8cd45fd8641eb28846c5245'
            }
        }
    );

    return response.data.access_token;
}

/**
 * Return the results from Spotify api
 * @param {String} query 
 * @param {String} token 
 * @returns {Object}
 */
async function fetchSpotifyResults(query, token) {
    try {
        const params = {
            params: {
                'q': query,
                'type': 'track'
            },
            headers: { Authorization: `Bearer ${token}` }
        }

        const response = await axios.get(
            'https://api.spotify.com/v1/search',
            params
        );

        return response.data.tracks.items;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getSpotifyResults
};