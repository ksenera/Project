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

        // clear the canvas of stamps if running new instance 
        this.stampModel.stampsCanvas.clear();

        // then redraw stamps 
        for (let s of this.stampModel.stamps) {
            this.stampModel.stampsCanvas.image(s.image, s.x, s.y, 150, 150);
        }

        // render the canvas specifically for stamps on top of video 
        image(this.stampModel.stampsCanvas, x, y, this.videoWidth, this.videoHeight);

        noFill();
        stroke(0);
        rect(x, y, this.videoWidth, this.videoHeight);


        // when mouse hovers over video show currently selected stamp 
        if (
            this.stampModel.selectedStamp && 
            mouseX >= x 
            && mouseY >= y 
            && mouseX <= x + this.videoWidth && 
            mouseY <= y + this.videoHeight
        ) {
            // stamp must be centered at the mouse even if stamp gets cut off video stream border 
            imageMode(CENTER);
            image(this.stampModel.selectedStamp, mouseX, mouseY, 150, 150);
            imageMode(CORNER);
        }
    }
}
