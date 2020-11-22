const axios = require("axios");

const getMotivationRecs = async (userId) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/seek_motivation/${userId}`
  );
  console.log(response.data);
  return response.data;
};

const getFriendRecs = async (userId) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/recommend_friends/${userId}`
  );
  console.log(response.data);
  return response.data;
};

const startAnalysis = async (userName) => {
  const response = await axios.get(
    `http://127.0.0.1:5000/start_analysis/${userName}`
  );
  console.log(response.data);
  // this axios get request is solely to get the userId to the Flask server
  return true;
};

// axios.get('http://127.0.0.1:5000/seek_motivation').then(resp => {
//     console.log(resp.data)
//     return resp.data;
// })

module.exports = {
  getMotivationRecs,
  getFriendRecs,
  startAnalysis,
};

