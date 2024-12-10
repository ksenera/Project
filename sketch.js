
let videoStream;
let canvasView;

let filterModel;
let stampModel;

let uiController;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Initializing the video stream and canvas view
    videoStream = new VideoStream(640, 480);
    filterModel = new FilterModel(640, 480);
    stampModel = new StampModel(640, 480);
    canvasView = new CanvasView(windowWidth, windowHeight, 640, 480, stampModel);
    uiController = new UIController(filterModel, stampModel);
    videoStream.start();
    
}

function draw() {
    background(220);

    const videoFrame = videoStream.getFrame();

    const filteredFrame = filterModel.applyFilter(videoFrame);

    // make sure the mouse is over the video stream area 
    const relativeMousePos = getRelativeMousePosition(mouseX, mouseY);
    const isMouseOverVideo = isWithinVideoArea(relativeMousePos);

    // for stamping logic make sure to pass mousePos only if over video stream 
    const mousePosition = isMouseOverVideo ? relativeMousePos : null;

    canvasView.render(filteredFrame, mousePosition);
}

/**
 * Function      :
 * Description   :
 * 
 * Parameters    :
 * Return        :
 * 
 */

function beginClip(x, y, width, height) {
    push(); 
    beginShape();
    vertex(x, y);
    vertex(x + width, y);
    vertex(x + width, y + height);
    vertex(x, y + height);
    endShape(CLOSE);
    clip(); 
}

function endClip() {
    pop();
}

/**
 * Function      : mousePressed() 
 * Description   : when the mouse is pressed within the video stream area 
 *                 and after a stamp is selected in the gui area of the window 
 *                 a stamp can be placed to the video stream 
 * Parameters    : None. 
 * Return        : None. 
 */

function mousePressed() {
    const relativeMousePos = getRelativeMousePosition(mouseX, mouseY);
    if (isWithinVideoArea(relativeMousePos)) {
        stampModel.addStamp(relativeMousePos);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasView.updateDimensions(windowWidth, windowHeight);
}

/**
 * Function     : getRelativeMousePosition() 
 * Description  :
 * Parameters   : mx - 
 *                my -
 * Return       : {x, y}
 */

function getRelativeMousePosition(mx, my) {
  const videoX = (windowWidth - 640) / 2;
  const videoY = (windowHeight - 480) / 2;
  return {
      x: mx - videoX,
      y: my - videoY
  };
}

function isWithinVideoArea(pos) {
    return pos.x >= 0 && pos.y >= 0 && pos.x <= 640 && pos.y <= 480;
}

