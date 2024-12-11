/** 
 * CLASS       : StampModel.js
 * 
 * DESCRIPTION : Model class for stamp placement logic
 * 
 */

class StampModel {
    constructor(videoWidth, videoHeight, stampWidth = 150, stampHeight = 150) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.stampWidth = stampWidth;
        this.stampHeight = stampHeight;
        this.selectedStamp = null; // 
        this.stamps = []; // array for the stamped stamps on video feed
        this.stampsCanvas = createGraphics(videoWidth, videoHeight); // new canvas for stamps 
    }

    // methods for selecting and deselecting stamps 
    selectStamp(image) {
        this.selectedStamp = image;
    }
    
    deselectStamp() {
        this.selectedStamp = null;
    }

    /**
     * Function      :
     * Description   :
     * 
     * Parameters    :
     * Return        :
     * 
     */
    addStamp(mousePosition) {
        // check video bounds if loop 
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
        this.stampsCanvas.image(
            this.selectedStamp,
            x,
            y,
            this.stampWidth,
            this.stampHeight
        );
    }

    // render stamps on its own canvas
    getStampsCanvas() {
        return this.stampsCanvas;
    }

    updateCanvasSize(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.stampsCanvas = createGraphics(videoWidth, videoHeight);
        this.stampsCanvas.clear();
        this.stamps.forEach(stamp => {
            this.stampsCanvas.image(
                stamp.image,
                stamp.position.x,
                stamp.position.y,
                this.stampWidth,
                this.stampHeight
            );
        });
    }

    clearStamps() {
        this.stamps = [];
        this.stampsCanvas.clear();
    }
}