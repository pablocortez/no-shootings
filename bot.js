console.log("Bot is starting...");

var Twit = require('twit')

var config = require('./config');

var T = new Twit(config);

function checkAndTweet() {
  T.get('search/tweets', params, gotData);
}

function gotData(err, data, response) {
  var tweets = data.statuses;
  var noTweets = isEmpty(tweets); // true if empty
  if(noTweets) {
    console.log("There are no tweets about that right now.");
  } else {
    console.log("There was a shooting today. #NoMoreShootings");
    tweetAboutShooting();
  }
  for(var i = 0; i < tweets.length; i++) {
    console.log((i+1) + ".- " + tweets[i].text);
  }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

// Search Twitter for words "shooting in US, mass shooting in US"

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
var today = yyyy+'-'+mm+'-'+dd;

var params = {
  q: 'today mass shooting US since:' + today,
  count: 5
}

setInterval(checkAndTweet, 1000*60*60*6);


//
//  Tweet!
//

function tweetAboutShooting() {
  var tweet = {
    status: "There was a shooting today. #NoMoreShootings"
  }

  T.post('statuses/update', tweet, gotPostData)

  function gotPostData(err, data, response) {
    if (err) {
      console.log("Something went wrong " + err);
    } else {
      console.log("Worked!");
    }
  }
}
