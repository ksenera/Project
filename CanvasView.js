/** 
 * CLASS       : CanvasView.js 
 * 
 * DESCRIPTION : View class that renders the canvas for the video stream 
 *               as well the shared drawing canvas for stamps, rectangle and ellipse 
 *               selects. Methods manage the drawing order and shapes and stamps are 
 *               displayed and clipped correctly within the video stream. 
 * 
 */


class CanvasView {
    constructor(windowWidth, windowHeight, videoWidth, videoHeight, stampModel, shapeModel) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.stampModel = stampModel;
        this.shapeModel = shapeModel;
    }
    
    /**
     * FUNCTION      : updateDimensions()
     * DESCRIPTION   : Updates the dimensions of the canvas view.
     * PARAMETERS    :  windowWidth - resized width of the window
     *                  windowHeight - resized height of the window
     * RETURNS       : None.
     */
    updateDimensions(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
    }

    /**
     * FUNCTION      : render()
     * DESCRIPTION   : Renders the video stream and the shared drawing canvas.
     * PARAMETERS    :  videoFrame - the current frame from the video stream
     *                  mousePosition - the current position of the mouse
     * RETURNS       : None.
     */
    render(videoFrame, mousePosition) {
        // find center position of the video stream
        const x = (this.windowWidth - this.videoWidth) / 2;
        const y = (this.windowHeight - this.videoHeight) / 2;

        // render video frame 
        image(videoFrame, x, y, this.videoWidth, this.videoHeight);

        // here the clipping region will be applied for stamps
        push();
        beginClip(x, y, this.videoWidth, this.videoHeight);

        image(drawingCanvas, x, y);

        // draw the shape preview on a separate layer for visual feedback
        if (this.shapeModel.currentShape && mousePosition) {
            // graphics buffer for preview created just for visual feedback
            let previewLayer = createGraphics(this.videoWidth, this.videoHeight);
            
            RenderShape.renderShape(previewLayer, {
                ...this.shapeModel.currentShape,
                endX: mousePosition.x,
                endY: mousePosition.y
            });
    
            image(previewLayer, x, y);
            previewLayer.remove();
        }

        // to render the selected stamp actually following the mouse cursor 
        if (this.stampModel.selectedStamp && mousePosition) { 
            // make sure the center position for the stamp is based on current 
            // mouse cursor position 
            const centeredX = mousePosition.x - this.stampModel.stampWidth / 2;
            const centeredY = mousePosition.y - this.stampModel.stampHeight / 2;

            // now render the stamp in calculated position 
            image(
                this.stampModel.selectedStamp,
                x + centeredX,
                y + centeredY,
                this.stampModel.stampWidth,
                this.stampModel.stampHeight
            );
        }

        endClip();
        pop();

        noFill();
        stroke(0);
        rect(x, y, this.videoWidth, this.videoHeight);
    }
}
