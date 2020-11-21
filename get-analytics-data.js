const axios = require("axios");

const getMotivationRecs = async () => {
    const response = await axios.get('http://127.0.0.1:5000/seek_motivation');
    console.log(response.data);
    return response.data;
}

const getFriendRecs = async () => {
    const response = await axios.get('http://127.0.0.1:5000/recommend_friends');
    console.log(response.data);
    return response.data;
}

// axios.get('http://127.0.0.1:5000/seek_motivation').then(resp => {
//     console.log(resp.data)
//     return resp.data;
// })

module.exports = {
    getMotivationRecs,
    getFriendRecs,
  };
  