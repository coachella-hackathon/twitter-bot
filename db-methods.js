const updateDBWithUserInfo = (userHandle, userData, db) => {
    const userRef = db.collection('users').doc(userHandle);
    userRef.set(userData);
}
module.exports = {
    updateDBWithUserInfo,
};
  