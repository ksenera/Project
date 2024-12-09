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

    /**
     * Function         : applyFilterType() 
     * Description      : uses switch case to apply a filter on the filter canvas.
     * Parameters       : filterType - 
     *                    frame - 
     * Return           ;
     */
    
    applyFilterType(filterType, frame) {
        this.filterCanvas.image(frame, 0, 0, this.videoWidth, this.videoHeight);

        switch (filterType) {
        case "invert":
            this.filterCanvas.loadPixels();
            for (let i = 0; i < this.filterCanvas.pixels.length; i += 4) {
            this.filterCanvas.pixels[i] = 255 - this.filterCanvas.pixels[i]; 
            this.filterCanvas.pixels[i + 1] = 255 - this.filterCanvas.pixels[i + 1]; 
            this.filterCanvas.pixels[i + 2] = 255 - this.filterCanvas.pixels[i + 2]; 
            }
            this.filterCanvas.updatePixels();
            break;

        case "gray":
            this.filterCanvas.filter(GRAY);
            break;

        case "posterize":
            this.filterCanvas.filter(POSTERIZE, 3);
            break;

        case "blur":
            this.filterCanvas.filter(BLUR, 3);
            break;

        default:
            break;
        }

        return this.filterCanvas;
    }
}
