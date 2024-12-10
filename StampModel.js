/** 
 * CLASS       : StampModel.js
 * 
 * DESCRIPTION : Model class for stamp placement logic 
 * 
 */

class StampModel {
    constructor(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.selectedStamp = null; // 
        this.stamps = []; // array for the stamped stamps on video feed
        this.stampsCanvas = createGraphics(videoWidth, videoHeight); // new canvas for stamps 
    }

    // method for selecting and deselecting stamps 
    selectStamp(image) {
        this.selectedStamp = image;
    }
    
    deselectStamp() {
        this.selectedStamp = null;
    }

    // method for adding stamp to video 
    addStamp(position) {
        // check video bounds if loop 
        if (!this.selectedStamp) return;
        // position is within bounds of video stream 
        const { x, y} = this.placeInVideoBounds(position);

        // push to stamps[] 
        this.stamps.push({
            image: this.selectedStamp,
            position: { x, y}, 
        });
    }

    // helper function to keep position within video stream boundary 
    placeInVideoBounds(position) {
        const halfW = 75;
        const halfH = 75;
        const x = constrain(position.x - halfW, 0, this.videoWidth - 150);
        const y = constrain(position.y - halfH, 0, this.videoHeight - 150);
        return { x, y };
    }

    // render stamps on its own canvas
    getStampsCanvas() {
        return this.stampsCanvas
    }
}