
const video = document.querySelector('video');
const faceDetector = new FaceDetector();
const faceBox = document.getElementById("facebox");

window.navigator.mediaDevices.getUserMedia({video: true})
  .then(mediaStream => { 
    
    video.srcObject = mediaStream ;
    video.onloadedmetadata = function(e) {
      video.play();
    };

    this.inverval = setInterval(async () => {
    const faces = await faceDetector.detect(video);
      // console.log(faces)
      faces.forEach(face => {
        const { width, height, top, left } = face.boundingBox;
        // console.log(face.boundingBox)

        

        faceBox.style.cssText = `
          position: absolute;
          z-index: 2;
          width: ${width + 30}px;
          height: ${height + 30}px;
          top: ${top + 15}px;
          left: ${left + 15}px;
          border: solid black 1px;
          background-image: url('/img.svg');
          `;
        
        face.landmarks.forEach((landmark, index) => {
        
          if (landmark.type !== "eye") {
            return 
            // div.style.cssText =`
            // z-index: 2;
            // width: 35%;
            // height: 35%;
            // position: absolute;
            // background-size: cover;
            // top: ${y - top - 50}px;
            // left: ${x - left - 50}px;
            // background-image: url('http://clipart-library.com/images/pc5orL8Li.png');`;
          }
          const { x, y } = landmark.location;
          const div = document.getElementById(`eye-${index}`);
         
          div.style.cssText = `
            z-index: 2;
            width: 35%;
            height: 35%;
            position: absolute;
            background-size: cover;
            top: ${y - top - 50}px;
            left: ${x - left - 50}px;
          `;
          // background-image: url('https://orig00.deviantart.net/39bb/f/2016/217/1/0/free_googly_eye_by_terrakatski-dacmqt2.png');
        });
      });
    }, 150);
  }, 500);


var canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
const snap = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = video.videoWidth
  const h = video.videoHeight
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(video, 0, 0, w, h);
  let newImage = canvas.toDataURL('image/png', 0.5)
  axios.post('/facedetector', { pic: newImage })
    .then(res => res.data)
    .then((face)=> {
      face = face.FaceDetails[0]
      console.log(face)
    })
}
