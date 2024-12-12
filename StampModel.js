/** 
 * CLASS       : StampModel.js
 * 
 * DESCRIPTION : Model class for stamp placement logic. Methods manage selection and 
 *               placement of stamps on the video stream.
 * 
 */

class StampModel {
    constructor(videoWidth, videoHeight, sharedCanvas, stampWidth = 150, stampHeight = 150) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.stampWidth = stampWidth;
        this.stampHeight = stampHeight;
        this.selectedStamp = null; // 
        this.stamps = []; // array for the stamped stamps on video feed
        this.drawingCanvas = sharedCanvas;
    }

    // methods for selecting and deselecting stamps 
    selectStamp(image) {
        this.selectedStamp = image;
    }
    
    deselectStamp() {
        this.selectedStamp = null;
    }

    /**
     * FUNCTION      : addStamp()
     * DESCRIPTION   : Adds a stamp to shared drawing canvas. Makes sure the mouse cursor is the center of 
     *                 the stamp and if the mouse is close to the video stream bounds the stamp is clipped.
     * PARAMETERS    : 
     *                  mousePosition - mouse cursor position
     * RETURNS       : None.
     */
    addStamp(mousePosition) {
        // check video bounds if cond 
        if (!this.selectedStamp) return;

        // first must calculate the centered position for the STAMP
        const x = mousePosition.x - this.stampWidth / 2;
        const y = mousePosition.y - this.stampHeight / 2;
        
        // if my mouse hovers towards the edges of video stream 
        // when placing the stamp clip the edges that go past the boundaries 
        this.stamps.push({
            image: this.selectedStamp,
            position: { x, y },
        });

        // finally draw on stamps canvas specifically 
        this.drawingCanvas.image(
            this.selectedStamp,
            x,
            y,
            this.stampWidth,
            this.stampHeight
        );
    }

    /**
     * FUNCTION      : updateCanvasSize()
     * DESCRIPTION   : Updates the canvas size and redraws the stamps.
     * PARAMETERS    : 
     *                  videoWidth - video stream width
     *                  videoHeight - video stream height
     * RETURNS       : None.
     */
    updateCanvasSize(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.drawingCanvasCanvas = createGraphics(videoWidth, videoHeight);
        this.drawingCanvasCanvas.clear();
        this.stamps.forEach(stamp => {
            this.drawingCanvasCanvas.image(
                stamp.image,
                stamp.position.x,
                stamp.position.y,
                this.stampWidth,
                this.stampHeight
            );
        });
    }

    /**
     * FUNCTION      : clearStamps()
     * DESCRIPTION   : Clears all stamps and redraws the video stream.
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    clearStamps() {
        this.stamps = [];
        this.drawingCanvas.clear();
        shapeModel.redrawShapes();
    }
}