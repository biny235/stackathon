function detectFaces() {
  // [START vision_face_detection]
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './secret.json'
  });

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  const fileName = './img2.jpg';

  client
    .faceDetection(fileName)
    .then(results => {
      return results
      
      
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

  // [END vision_face_detection]
}

module.exports = detectFaces;