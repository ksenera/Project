/** 
 * CLASS       : FilerModel.js 
 * 
 * DESCRIPTION : Model class for filter logic. 
 * 
 */

class StampModel {
    constructor(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.selectedStamp = null; // 
        this.stamps = []; // array for the stamped stamps on video feed
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
    }

}