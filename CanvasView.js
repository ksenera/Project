/** 
 * CLASS       : CanvasView.js 
 * 
 * DESCRIPTION : View class that renders the canvas for the video stream 
 *               as well as other canvases for stamps, rectangle and ellipse 
 *               selects. 
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
    
    updateDimensions(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
    }

    render(videoFrame, mousePosition) {
        // find center position of the video stream
        const x = (this.windowWidth - this.videoWidth) / 2;
        const y = (this.windowHeight - this.videoHeight) / 2;

        // render video frame 
        image(videoFrame, x, y, this.videoWidth, this.videoHeight);

        // here the clipping region will be applied for stamps
        push();
        beginClip(x, y, this.videoWidth, this.videoHeight);

        // render the stamps canvas
        image(this.stampModel.getStampsCanvas(), x, y);

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


        push();
        beginClip(x, y, this.videoWidth, this.videoHeight);

        image(this.shapeModel.getShapesCanvas(), x, y);
        this.shapeModel.renderCurrentShape(mousePosition);

        endClip();
        pop();

        noFill();
        stroke(0);
        rect(x, y, this.videoWidth, this.videoHeight);
    }
}
