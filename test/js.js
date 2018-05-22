
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
        faces.forEach(face => {
          const { width, height, top, left } = face.boundingBox;
          faceBox.style = `
            position: absolute;
            z-index: 2;
            width: ${width + 50}px;
            height: ${height + 50}px;
            top: ${top - 50}px;
            left: ${left}px;

            `;
        });
      }, 50);
  });


var canvas = document.querySelector('canvas');
canvas.width = 500;
canvas.height = 500;
const ctx = canvas.getContext('2d');
let count = 0;
const snaps = ()=>{
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = video.videoWidth
  const h = video.videoHeight
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(video, 0, 0, w, h);
  let newImage = canvas.toDataURL('image/png', 0.5)
  axios.post('/facedetector', { pic: newImage })
    .then(res => res.data)
    .then((_faces)=> {
      const { Emotions, AgeRange, Eyeglasses } = _faces.FaceDetails[0]
      console.log(Emotions, AgeRange, Eyeglasses)
      picChooser(Emotions[0])
    })
}

const picChooser = (emotion) =>{
  
  switch (emotion.Type){
    case "HAPPY":
      console.log("HAPPY")
      faceBox.classList = ''
      faceBox.classList.add(emotion.Type)
      break;
    case "SAD":
      console.log("SAD")
      faceBox.classList = ''
      faceBox.classList.add(emotion.Type)
      break;
    case "CALM":
      console.log("CALM")
      faceBox.classList = ''
      faceBox.classList.add(emotion.Type)
      break;
    case "SURPRISED":
      console.log("SURPRISED")
      faceBox.classList = ''
      faceBox.classList.add(emotion.Type)
      break;
    case "CONFUSED":
      console.log("CONFUSED")
      faceBox.classList = ''
      faceBox.classList.add(emotion.Type)
      break;
    case "UNKNOWN":
      console.log("UNKNOWN");
      faceBox.classList = '';
      faceBox.classList.add(emotion.Type);
    default:
      return emotion.type
  }
}
const snap = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const w = video.videoWidth
  const h = video.videoHeight
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(video, 0, 0, w, h);
  let newImage = canvas.toDataURL('image/png', 0.5)
  axios.post('/facedetector', { pic: newImage })
    .then(res => res.data)
    .then((_faces)=> {
      const { Emotions, AgeRange, Eyeglasses } = _faces.FaceDetails[0]
      console.log(Emotions, AgeRange, Eyeglasses)
      picChooser(Emotions[0])
    })
}, 2000)

// if(count > 10){
//   clearInterval(snap)
// }

