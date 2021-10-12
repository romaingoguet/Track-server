const admin = require('./admin');
const db = admin.db;

/**
 * 
 * @param {String} user_id 
 * @returns {Object}
 */
 async function getUser(user_id) {
    const user = await db.collection('users').doc(user_id).get();
    return user.data();
}

/**
 * 
 * @param {String} user_id 
 * @param {Object} user 
 * @returns {Object}
 */
 async function addNewUser(user_id, user) {
    await db.collection('users').doc(user_id).set(user);
    return user;
}

/**
 * Update user
 * @param {String} user_id 
 * @param {Object} user 
 * @returns {Object}
 */
 async function updateUser(user_id, user) {
    const userData = await db.collection('users').doc(user_id).update({ user });
    return userData;
}

module.exports = {
    getUser,
    addNewUser,
    updateUser,
};
