export class CameraController {
  constructor(videoEl) {
    this._videoEl = videoEl

    // Questiona ao usuário a permissão do uso da mídia dele (neste cado, da câmera/ vídeo)
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(stream => {
        /*
                src - Informa a fonte do vídeo
                createObjectURL() - cria um arquivo no formato binário
            */
        // this._videoEl.src = URL.createObjectURL(stream);
        this._stream = stream
        let mediaStream = new MediaStream(stream)
        this._videoEl.srcObject = mediaStream
        this._videoEl.play()
      })
      .catch(err => {
        console.error(err)
      })
  }

  stop() {
    this._stream.getTracks().forEach(track => {
      track.stop()
    })
  }

  takePicture(mimeType = 'image/png') {
    let canvas = document.createElement('canvas')

    canvas.setAttribute('height', this._videoEl.videoHeight)
    canvas.setAttribute('width', this._videoEl.videoWidth)

    let context = canvas.getContext('2d')

    context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height)

    return canvas.toDataURL(mimeType) // Converte o vídeo da camera para um Base64
  }
}
