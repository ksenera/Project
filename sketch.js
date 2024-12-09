
let videoStream;
let canvasView;

let filterModel;
let uiController;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initializing the video stream and canvas view
  videoStream = new VideoStream(640, 480);
  canvasView = new CanvasView(windowWidth, windowHeight, 640, 480);
  filterModel = new FilterModel(640, 480);
  uiController = new UIController(filterModel);
  videoStream.start();
    
}

function draw() {
  background(220);

  const videoFrame = videoStream.getFrame();

  const filteredFrame = filterModel.applyFilter(videoFrame);

  canvasView.render(filteredFrame);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasView.updateDimensions(windowWidth, windowHeight);
}
