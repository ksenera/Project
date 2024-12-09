/** 
 * CLASS       : VideoController.js 
 * 
 * DESCRIPTION : Controller class for the video stream, handles user interactions and updates the model. 
 * 
 */


export default class VideoStream {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.video = createCapture(VIDEO);
      this.video.size(width, height);
      this.video.hide();
    }

    start() {

    }

    getFrame() {
        return this.video;
    }
}