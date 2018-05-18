const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser');
const aws = require('./aws')

// const vision = require('@google-cloud/vision');

// const client = new vision.ImageAnnotatorClient({
//   keyFilename: './secret.json'
// });

app.use(bodyParser.json({limit: '50mb'}))

app.use('/', express.static(path.join(__dirname + '/test/')))

app.get('/', (req, res, next)=>{
  // console.log(client)
  res.sendFile(path.join(__dirname + '/test/index.html') )
  
});

app.post('/facedetector', (req, res, next)=>{
  const { pic } = req.body
  const base64Image = pic.split(';base64,').pop();

  const image = './out.jpg'
  const params = {
    Image: {
      Bytes: new Buffer(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    },
    Attributes: [
      'ALL',
    ]
  };

  aws.detectFaces(params, (err, data)=>{
    if(err){
      console.log(err)
      
      return next()
    }
    console.log(data)
    res.send(data)
  })

  // const request = {image: {source: {filename: image}}};
  // client
  //   .faceDetection(request)
  //   .then(results => {
  //     console.log(results)
  //     res.send(results)
  //   })
  //   .catch(err => {
  //     console.error('ERROR:', err);
  //   });
})

app.listen(3000, ()=> console.log('listening'))