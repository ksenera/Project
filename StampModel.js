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
        //this.stampsCanvas = createGraphics(videoWidth, videoHeight); // new canvas for stamps 
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

        // first must calculate the centered position for the STAMP
        const x = constrain(position.x, 75, this.videoWidth - 75);
        const y = constrain(position.y, 75, this.videoHeight - 75);

        // if my mouse hovers towards the edges of video stream 
        // when placing the stamp clip the edges that go past the boundaries 
        this.stamps.push({
            image: this.selectedStamp,
            position: { x, y },
        });
    }

    renderStamps(x, y, width, height) {
        // stamps will be clipped outside of streaming boundaries 
        push(); // need to put it on the stack 
        clip(x, y, width, height);

        imageMode(CENTER);
        for (const stamp of this.stamps) {
          image(stamp.image, x + stamp.position.x, y + stamp.position.y, 150, 150);
        }
        pop();
    }

    // render stamps on its own canvas
    //getStampsCanvas() {
    //    return this.stampsCanvas
    //}
}