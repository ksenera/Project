import VideoStream from './controllers/VideoController.js';

let videoStream;

function setup() {
  createCanvas(windowWidth, windowHeight);

    // Initializing the video stream and canvas view
    videoStream = new VideoStream(640, 480);
    
}

function draw() {
  background(220);
}
