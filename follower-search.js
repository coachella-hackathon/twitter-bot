// https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-followers-ids
const axios = require("axios");

const oAuthConfig = {
  consumer_key: "zTu449DUl7MyUIkcUcgTxV7cN",
  consumer_secret: "WiTEqsSJwex7OhbPC0d388FHo4DGAD9PijAZo44p74zQzw5I36",
  token: "905477697744232449-LFZg8uw520bVpFrTi3wrSXJ1KAnGXVw",
  token_secret: "qtpuD53OqaumJxuKnh5xb44R9GcS5OvDt5nqC7gl808jC",
};

const getUser = async (userId) => {
  // user tweets
  const baseUrl = "https://api.twitter.com/2/tweets";
  const params = {
    ids: userId,
    include_entities: true,
    headers: {
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAFPnJgEAAAAAXNNCdF3infsKllQ%2FKXcus6IiDVQ%3DB9pYMfGTUebpzMd6Y3sG4ruvMp5ptPyqL2K5vrvh1fL7lrULrm'
    }
  }
  const response = await axios.get(baseUrl, params);
  return response.data;
} 


const getFollowerList = async (userName) => {
  const baseUrl = "https://api.twitter.com/1.1/followers/ids.json";
  const params = {
    cursor: -1,
    screen_name: userName,
    skip_status: true,
    include_user_entities: false,
  };

  const response = await axios.get(baseUrl, params);
  return response.data;
};

//array of ids
const getTweetHistoryOfIds = async (listOfIds, userData, updateDBWithUserInfo, userName, db) => {
  var Twitter =  require('twitter-node-client').Twitter;
  var error = function (err, response, body) {
      console.log('ERROR [%s]', err);
  };
  
  var config = {
      "consumerKey": "zTu449DUl7MyUIkcUcgTxV7cN",
      "consumerSecret": "WiTEqsSJwex7OhbPC0d388FHo4DGAD9PijAZo44p74zQzw5I36",
      "accessToken": "905477697744232449-LFZg8uw520bVpFrTi3wrSXJ1KAnGXVw",
      "accessTokenSecret": "qtpuD53OqaumJxuKnh5xb44R9GcS5OvDt5nqC7gl808jC"    
  };
  var twitter = new Twitter(config);
  const response = twitter.getUserTimeline({user_id: listOfIds,count: '10'}, error,(res)=>{
    const resp = JSON.parse(res).map((val)=>{
      let str = val.text;
      str=str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
      return {
        "tweet_id": val.id,
        "tweet_text": str,
        "like_count": val.favorite_count,
        "retweet_count": val.retweet_count,
        "created_at": val.created_at,
        "entities": {"hashtags": val.entities.hashtags},

      }
    });
  
    let output = {};
    resp.forEach((val, idx) => {
      output[idx]=val;
    });
    output.additionalInfo = userData;
    
    updateDBWithUserInfo(userName, output, db)
  });
  return response;
};

module.exports = {
  getFollowerList,
  getTweetHistoryOfIds,
  getUser,
};
