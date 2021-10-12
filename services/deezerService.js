const axios = require('axios');

/**
 * 
 * @param {String} query 
 * @returns {Object}
 */
async function getDeezerResults(query) {
    try {
        const params = {
            params: {
                'q': query,
                'type': 'track'
            },
        }

        const response = await axios.get(
            'https://api.deezer.com/search/track/',
            params
        );
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getDeezerResults,
}