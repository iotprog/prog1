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
        'Authorization': 'Bearer {skA+kKmAPyUZSL2N2Vt8sj1NOk6QuGUkQjZbiKXQ7m+ii7P8EojDL4NpCHsDK9f4KGcG2p5wa3Mjn1s5Z3zcPvWrL1giDwVnLvUULOeVKIgQ9s6VOUJz3LCQrRAZGO53Dymsa5AHTBG5RQpSWFrYQwdB04t89/1O/w1cDnyilFU=}'
    }
    if(msgs == "ที่ไหน"){
         body = JSON.stringify({
            replyToken: reply_token,
            messages: [{
              "type": "location",
                "title": "บ้านสวน ตอนโดฯ",
                "address": "สำนักงาน RJKIOT", 
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
            text: 'เราเป็น Bot รับงานทางด้าน IOT และ AI'
        },
        {
            type: 'text',
            text: 'http://rjkiot.42web.io'
        },
        {
            "type": "sticker",
            "packageId": "11538",
            "stickerId": "51626498"
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
