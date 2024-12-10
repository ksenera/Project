/** 
 * CLASS       : CanvasView.js 
 * 
 * DESCRIPTION : View class that renders the canvas for the video stream 
 *               as well as other canvases for stamps, rectangle and ellipse 
 *               selects. 
 * 
 */


class CanvasView {
    constructor(windowWidth, windowHeight, videoWidth, videoHeight, stampModel) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.stampModel = stampModel;
    }
    
    updateDimensions(windowWidth, windowHeight) {
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
    }

    render(videoFrame) {
        // find center position of the video stream
        const x = (this.windowWidth - this.videoWidth) / 2;
        const y = (this.windowHeight - this.videoHeight) / 2;

        // render video frame 
        image(videoFrame, x, y, this.videoWidth, this.videoHeight);

        // render the stamps canvas
        image(
            this.stampModel.getStampsCanvas(),
            x,
            y,
            this.videoWidth,
            this.videoHeight
        );

        noFill();
        stroke(0);
        rect(x, y, this.videoWidth, this.videoHeight);
    }
}
