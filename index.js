// Reply with two static messages

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const port = process.env.PORT || 4000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var msgs,body;
app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
     msgs = req.body.events[0].message.text // message incoming
    reply(reply_token)
    res.sendStatus(200)
})

app.listen(port)
function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {jzFv8VNiyxZHOgLSRyTbNyt2/gbcazscYCiKnu+1P8dAkhkTTPw0ztA+GAY2ZX0Gn6jnksu4JrUFiG9/2FMPiE4qavhKjg9NPIU7/xHFwUmTej+HfuyJiw3JsWlFhtcXmPrxWcCHrnJmAWcZ5LKIjAdB04t89/1O/w1cDnyilFU=}'
    }
    if(msgs == "ที่ไหน"){
         body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
              "type": "location",
                "title": "บ้านสวน",
                "address": "ที่กบดาน อิอิ", 
                "latitude": 13.860480,
                "longitude": 100.575768
            }
            ]
        })
    }else{

     body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'สวัสดี'
        },
        {
            type: 'text',
            text: 'How are you?'
        },
        {
            "type": "location",
            "title": "บ้านสวน",
            "address": "ที่กบดาน อิอิ", 
            "latitude": 13.860480,
            "longitude": 100.575768
        }
        ]
    })
  }
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });


}