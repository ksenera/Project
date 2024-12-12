/* 
 * FILE          : sketch.js 
 * PROJECT       : SENG3040 - Project
 * PROGRAMMER    : Kushika Senera 
 * FIRST VERSION : 11/12/2024
 * DESCRIPTION   : The purpose of this sketch.js file is to 
 */


let videoStream;
let canvasView;

let filterModel;
let stampModel;

let shapeModel;

let uiController;

let drawingCanvas;

/**
 * FUNCTION      : setup
 * DESCRIPTION   : Sets up the canvas and initializes the SolarSystemController.
 * PARAMETERS    : None.
 * RETURNS       : None.
 */
function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);

    // with new css changes make sure the video stream renders 
    canvas.parent('canvas-container');

    // shared canvas to render shapes and stamps in order 
    drawingCanvas = createGraphics(640, 480);

    // Initializing the video stream and canvas view
    videoStream = new VideoStream(640, 480);
    filterModel = new FilterModel(640, 480);
    stampModel = new StampModel(640, 480, drawingCanvas);
    shapeModel = new ShapeModel(640, 480, drawingCanvas);
    canvasView = new CanvasView(windowWidth, windowHeight, 640, 480, stampModel, shapeModel);
    uiController = new UIController(filterModel, stampModel, shapeModel);
    videoStream.start();
    
}


/** 
 * FUNCTION      : draw()
 * DESCRIPTION   : Main loop of the sketch program. Has function calls for other param
 *                 draw functions. 
 * PARAMETERS    : None. 
 * RETURNS       : Runs the sketch on Port 5500.
 */
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
 * FUNCTION      : draw()
 * DESCRIPTION   : Main loop of the sketch program. Has function calls for other param
 *                 draw functions. 
 * PARAMETERS    : None. 
 * RETURNS       : Runs the sketch on Port 5500.
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
 * FUNCTION      : mousePressed() 
 * DESCRIPTION   : when the mouse is pressed within the video stream area 
 *                 and after a stamp is selected in the gui area of the window 
 *                 a stamp can be placed to the video stream 
 * PARAMETERS    : None. 
 * RETURNS       : None. 
 */
function mousePressed() {
    const pos = getRelativeMousePosition(mouseX, mouseY);
    if (isWithinVideoArea(pos)) {
        if (uiController.currentTool === 'rectangle' || uiController.currentTool === 'ellipse') {
            shapeModel.startShape(uiController.currentTool, pos.x, pos.y);
        } else if (uiController.currentTool === 'stamp') {
            stampModel.addStamp(pos);
        }
    }
}

function mouseDragged() {
    const pos = getRelativeMousePosition(mouseX, mouseY);
    if (uiController.currentTool) {
        shapeModel.updateShape(pos.x, pos.y);
    }
}

function mouseReleased() {
    if (uiController.currentTool && (uiController.currentTool === 'rectangle' || uiController.currentTool === 'ellipse')) {
        shapeModel.finalizeShape();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasView.updateDimensions(windowWidth, windowHeight);
    shapeModel.updateCanvasSize(640, 480);
    stampModel.updateCanvasSize(640, 480);
}

/** 
 * FUNCTION      : draw()
 * DESCRIPTION   : Main loop of the sketch program. Has function calls for other param
 *                 draw functions. 
 * PARAMETERS    : None. 
 * RETURNS       : Runs the sketch on Port 5500.
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

function keyPressed() {
    if (key === ' ') { 
        captureImage();
    }
}

/** 
 * FUNCTION      : captureImage()
 * DESCRIPTION   : 
 * PARAMETERS    : None. 
 * RETURNS       : 
 */
function captureImage() {
    const captureCanvas = createGraphics(640, 480);

    captureCanvas.image(videoStream.getFrame(), 0, 0, 640, 480);
    drawQueue.forEach((item) => {
        if (item.type === 'shape') {
            RenderShape.renderShape(captureCanvas, item.data);
        } else if (item.type === 'stamp') {
            const { image, position } = item.data;
            captureCanvas.image(
                image,
                position.x,
                position.y,
                stampModel.stampWidth,
                stampModel.stampHeight
            );
        }
    });

    save(captureCanvas, 'captured_image.png');
}
