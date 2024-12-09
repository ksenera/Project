/** 
 * CLASS       : FilerModel.js 
 * 
 * DESCRIPTION : Model class for filter logic. 
 * 
 */


class FilterModel {
    constructor(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.filterCanvas = createGraphics(videoWidth, videoHeight);
        this.activeFilter = "none"; 
        this.filters = {
            none: (frame) => frame,
            invert: (frame) => this.applyInvert(frame),
            gray: (frame) => this.applyGray(frame),
            posterize: (frame) => this.applyPosterize(frame),
            blur: (frame) => this.applyBlur(frame),
        };
    }
}