/** 
 * CLASS       : CanvasView.js 
 * 
 * DESCRIPTION : View class that renders the canvas
 * 
 */


export default class CanvasView {
    constructor(windowWidth, windowHeight, videoWidth, videoHeight) {
      this.windowWidth = windowWidth;
      this.windowHeight = windowHeight;
      this.videoWidth = videoWidth;
      this.videoHeight = videoHeight;
    }