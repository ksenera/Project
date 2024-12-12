/** 
 * CLASS       : FilerModel.js 
 * 
 * DESCRIPTION : Model class for filter logic. Methods manage the application of filters 
 *               to the video stream. 
 * 
 */


class FilterModel {
    constructor(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.filterCanvas = createGraphics(videoWidth, videoHeight);
        this.currentFilter = "none"; // when video starts streaming should be no filter by default
        this.filters = {
            none: (frame) => this.applyFilterType("none", frame),
            invert: (frame) => this.applyFilterType("invert", frame),
            gray: (frame) => this.applyFilterType("gray", frame),
            posterize: (frame) => this.applyFilterType("posterize", frame),
            blur: (frame) => this.applyFilterType("blur", frame),
        };
    }

    /**
     * FUNCTION      : setCurrentFilter()
     * DESCRIPTION   : Sets the current filter to the filter in switch case.
     * PARAMETERS    : 
     *                  filterName - current filter name
     * RETURNS       : None.
     */
    setCurrentFilter(filterName) {
        if (this.filters[filterName]) {
          this.currentFilter = filterName;
        } else {
          console.warn(`Filter '${filterName}' does not exist.`);
        }
    }
    
    applyFilter(frame) {
        return this.filters[this.currentFilter](frame);
    }

    /**
     * FUNCTION      : applyFilterType()
     * DESCRIPTION   : Uses switch case to apply a filter on the filter canvas.
     * PARAMETERS    : 
     *                  filterType - filter being applied
     *                  frame - video stream frame
     * RETURNS       : None.
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
