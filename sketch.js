import VideoStream from './controllers/VideoController.js';
import CanvasView from './views/CanvasView.js';

let videoStream;
let canvasView;

function setup() {
  createCanvas(windowWidth, windowHeight);

    // Initializing the video stream and canvas view
    videoStream = new VideoStream(640, 480);
    canvasView = new CanvasView(windowWidth, windowHeight, 640, 480);

    videoStream.start();
    
}

function draw() {
  background(220);

  const videoFrame = videoStream.getFrame();

  canvasView.render(videoFrame);
}
