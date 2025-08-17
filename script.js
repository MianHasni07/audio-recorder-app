const startbtn = document.getElementById('startbtn')
const stopbtn = document.getElementById('stopbtn')
const audioPlayer = document.getElementById('audioPlayer')


let mediaRecorder;
let audioChunks = []

startbtn.addEventListener('click' , startRecording)

stopbtn.addEventListener('click' , stopRecording)

function startRecording(){
  navigator.mediaDevices.getUserMedia({audio:true})
  .then(stream=>{
          mediaRecorder = new MediaRecorder(stream)
          mediaRecorder.ondataavailable = event=>{
            if(event.data.size > 0){
                audioChunks.push(event.data)
            }
          }
          mediaRecorder.onstop =()=>{
            const audioBlob = new Blob(audioChunks,{type:'audio/waw'})
            audioPlayer.src = URL.createObjectURL(audioBlob)
          }
          mediaRecorder.start()
          startbtn.disabled = true
          stopbtn.disabled = false
  })
}

function stopRecording(){

     if(mediaRecorder.state === 'recording'){
        mediaRecorder.stop()
        startbtn.disabled = false
        stopbtn.disabled = true
        
     }
}
