const express = require('express')
const app = express()
const port = 5500
require('dotenv').config();

app.use(express.static('public'))

var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         process.env.API_KEY,
  consumer_secret:      process.env.API_SECRET_KEY,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


app.get('', (req, res) => {
    res.sendFile('public/index.html')

})

app.get('/:word', (req, res) => {
    let word = req.params.word
    let tweets = []
    T.get('search/tweets', { q: word, count: 25 }, async function(err, data, response) {
        for(let i = 0; i < data.statuses.length; i++) { 
            let tweet = data.statuses[i]
            let url = tweet.user.screen_name ? `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}` : ''
            let shortTweet = {
                text: tweet.text,
                user: tweet.user.screen_name ? tweet.user.screen_name: '',
                url: url
            }
            await tweets.push(shortTweet)
        if (i >= 20) { 
          res.send(JSON.stringify(tweets))
        }
    }
    
    res.send(JSON.stringify(tweets))
    
    })
    
    
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})