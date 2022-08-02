import '../scss/style.scss';

import axios from 'axios';

export async function getProducts() {
  const request = await axios.get('https://api.test-domain.de/products');
  if (request?.status === 200) {
    return request?.data;
  } else {
    return 'keine Daten';
  }
}

const videoPreview = document.querySelector('#video-preview');
const screenshot = document.querySelector('#screenshot');
const buttonScreenshot = document.querySelector('#button-screenshot');
const buttonDownload = document.querySelector('#button-download');

disabledButtons(true);

navigator.mediaDevices.getUserMedia({ video: true }).then(async videoStream => {
  videoPreview.srcObject = videoStream;
  disabledButtons(false);

  buttonScreenshot.addEventListener('click', async () => takeScreenshot(videoStream));

  buttonDownload.addEventListener('click', async () => startDownload(videoStream));
});
async function getImageBlob(videoStream) {
  const track = videoStream.getVideoTracks()[0];
  const imageBlob = await new ImageCapture(track).takePhoto();
  return imageBlob;
}

async function takeScreenshot(videoStream) {
  screenshot.src = URL.createObjectURL(await getImageBlob(videoStream));
}

async function startDownload(videoStream) {
  const imageURL = URL.createObjectURL(await getImageBlob(videoStream));
  const link = document.createElement('a');
  link.href = imageURL;
  link.download = `screenshot-${new Date().toLocaleTimeString()}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function disabledButtons(state) {
  buttonDownload.disabled = state;
  buttonScreenshot.disabled = state;
}
