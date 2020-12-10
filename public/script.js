// const { json } = require("body-parser");

const form = document.getElementById('form');
const keywords = document.getElementById('keywords');
const output = document.getElementById('output')
const tweetText = document.getElementById('tweetText')
const tweetUser = document.getElementById('tweetUser')
const tweetUrl = document.getElementById('tweetUrl')
document.getElementById("clear").addEventListener("click", clear);
let ourData = []

function clear() {
  ourData = [];
  document.getElementById("tweets").innerHTML = ''; 
  document.getElementById("error").innerHTML = ''; 
  document.getElementById('keywords').value = '';
  document.getElementById("stats").innerHTML = '';
  
}

async function getTweet (words) {
  
  await fetch(`http://localhost:5500/${words}`)
      .then(res => res.json())
      .then(data => ourData.push(data))
  if (ourData[0].length > 0) {
    document.getElementById("stats").innerHTML = `<em><b>Displaying ${ourData[0].length} tweets</b></em>`
  } else {
    document.getElementById("error").innerHTML = `<em><b>Could not find any matching tweets. Please try different
    keyword(s), or if you think something is wrong, reload the page and try again.</b></em>`
  }
  let str = '<ul>'
  ourData[0].forEach(function(tweet) {
      str += 
        `<li><b>tweet text: </b>${tweet.text}</li> 
        <li><b>tweeted by: </b>@${tweet.user}</li> 
        <li><b>link to tweet: </b> <a target="_blank" href="${tweet.url}">${tweet.url}</a></li><hr>`
   })
  str += '</ul>'
  document.getElementById("tweets").innerHTML = str;
   
  }


form.addEventListener('submit', (e) => {
  e.preventDefault();
  ourData = [];
  document.getElementById("tweets").innerHTML = ''; 
  document.getElementById("error").innerHTML = ''; 
  document.getElementById("stats").innerHTML = ''; 
  let words = keywords.value;
  getTweet(words)
});
 