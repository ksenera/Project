
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

    canvasView.render(filteredFrame);
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
    const x = mouseX - (windowWidth - 640) / 2;
    const y = mouseY - (windowHeight - 480) / 2;
    if (x >= 0 && y >= 0 && x <= 640 && y <= 480) {
        stampModel.addStamp({ x, y });
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasView.updateDimensions(windowWidth, windowHeight);
}

