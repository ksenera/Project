/* 
 * FILE          : sketch.js 
 * PROJECT       : SENG3040 - Project
 * PROGRAMMER    : Kushika Senera 
 * FIRST VERSION : 11/12/2024
 * DESCRIPTION   : The purpose of this sketch.js file is to set up the canvas and
 *                 render the video stream, stamps, and shapes, while also handling 
 *                 mouse events and UI interactions.
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
 * DESCRIPTION   : Sets up the canvas and initializes the MVC components.
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
 * FUNCTION      : beginClip()
 * DESCRIPTION   : p5.js function to clip the canvas to a specific area 
 *                 for stamps and shapes. This ensure stamps do not exceed video stream
 *                 boundaries.        
 * PARAMETERS    : 
 *                  x - x-coord of top left corner of clipping rectangle.
 *                  y - y-coord of top left corner of clipping rectangle.
 *                  width - width of clipping rectangle.
 *                  height - height of clipping rectangle.
 * RETURNS       : None.
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

/** 
 * FUNCTION      : endClip()
 * DESCRIPTION   : p5.js function to end the clipping region 
 * PARAMETERS    : None. 
 * RETURNS       : None.
 */
function endClip() {
    pop();
}

/**
 * FUNCTION      : mousePressed() 
 * DESCRIPTION   : When the mouse is pressed within the video stream area after a tool
 *                 is selected, a stamp is added or the first corner of a shape is drawn. 
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

/**
 * FUNCTION      : mouseDragged() 
 * DESCRIPTION   : Handles mouse drag events. The current shape is updated with the new mouse position.
 * PARAMETERS    : None. 
 * RETURNS       : None. 
 */
function mouseDragged() {
    const pos = getRelativeMousePosition(mouseX, mouseY);
    if (isWithinVideoArea(pos) && 
        (uiController.currentTool === 'rectangle' || uiController.currentTool === 'ellipse')) {
        shapeModel.updateShape(pos.x, pos.y);
    }
}

/**
 * FUNCTION      : mouseReleased
 * DESCRIPTION   : When mouse is released, the shape is finalized.
 * PARAMETERS    : None.
 * RETURNS       : None.
 */
function mouseReleased() {
    if (uiController.currentTool && 
        (uiController.currentTool === 'rectangle' || uiController.currentTool === 'ellipse')) {
        shapeModel.finalizeShape();
    }
}

/**
 * FUNCTION      : windowResized
 * DESCRIPTION   : Adjusts the canvas size and MVC components when the browser window is resized.
 * PARAMETERS    : None.
 * RETURNS       : None.
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvasView.updateDimensions(windowWidth, windowHeight);
    shapeModel.updateCanvasSize(640, 480);
    stampModel.updateCanvasSize(640, 480);
}

/** 
 * FUNCTION      : getRelativeMousePosition()
 * DESCRIPTION   : Calculates the relative mouse position within the video stream area.
 * PARAMETERS    : mx - The x-coordinate of the mouse.
 *                 my - The y-coordinate of the mouse.
 * RETURNS       : Object that contains relative mouse position.
 */
function getRelativeMousePosition(mx, my) {
  const videoX = (windowWidth - 640) / 2;
  const videoY = (windowHeight - 480) / 2;
  return {
      x: mx - videoX,
      y: my - videoY
  };
}

/**
 * FUNCTION      : isWithinVideoArea()
 * DESCRIPTION   : Checks if mouse cursor is over the video stream area.
 * PARAMETERS    : pos - The mouse position.
 * RETURNS       : Boolean if mouse cursor is within video stream area.
 */
function isWithinVideoArea(pos) {
    return pos.x >= 0 && pos.y >= 0 && pos.x <= 640 && pos.y <= 480;
}

/**
 * FUNCTION      : keyPressed()
 * DESCRIPTION   : By pressing the spacebar the current frame is captured in captureImage()
 * PARAMETERS    : None.
 * RETURNS       : None.
 */
function keyPressed() {
    if (key === ' ') { 
        captureImage();
    }
}

/** 
 * FUNCTION      : captureImage()
 * DESCRIPTION   : Captures the current video frame but also draws the filters, stamps, and shapes
 *                 if the user selected and used those tools. 
 * PARAMETERS    : None. 
 * RETURNS       : None.
 */
function captureImage() {
    const captureCanvas = createGraphics(640, 480);
    
    const currentFrame = videoStream.getFrame();
    const filteredFrame = filterModel.applyFilter(currentFrame);
    
    captureCanvas.image(filteredFrame, 0, 0, 640, 480);
    
    captureCanvas.image(drawingCanvas, 0, 0);
    
    save(captureCanvas, 'photobooth_capture.png');
    
    captureCanvas.remove();
}
