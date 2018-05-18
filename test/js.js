
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
          console.log(face)
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
      }, 150);
  });
})


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
    .then((faces)=> {
      console.log(faces.FaceDetails[0].Emotions[0])
      
    })
}
// const snap = setInterval(() => {
//   count++
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   const w = video.videoWidth
//   const h = video.videoHeight
//   ctx.fillRect(0, 0, w, h);
//   ctx.drawImage(video, 0, 0, w, h);
//   let newImage = canvas.toDataURL('image/png', 0.5)
//   axios.post('/facedetector', { pic: newImage })
//     .then(res => res.data)
//     .then((faces)=> {
//       console.log(faces)
      
//     })
// }, 2000)

// if(count > 10){
//   clearInterval(snap)
// }

