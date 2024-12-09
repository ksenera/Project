/** 
 * CLASS       : UIController.js
 * 
 * DESCRIPTION : Controller class that controls the UI 
 * 
 */

class UIController {
    constructor(filterModel, stampModel) {
        this.filterModel = filterModel;
        this.filterSelector = createSelect();

        // adding ui controls for stamp model 
        this.stampModel = stampModel;
        this.stampButtons = [];

        this.initUI();
    }

    // temporary initializer just for the filter drop down menu.
    // adding the stamp functionality to this initializer will focus on GUI
    // after functionality works 
    initUI() {
        this.filterSelector.position(10, 10);
        this.filterSelector.option("none");
        this.filterSelector.option("invert");
        this.filterSelector.option("gray");
        this.filterSelector.option("posterize");
        this.filterSelector.option("blur");
        this.filterSelector.changed(() => {
          this.filterModel.setCurrentFilter(this.filterSelector.value());
        });

        // initialize stamp buttons as per the images in assets folder 
        const stampPaths = ["cat.png", "rainbow.jpg", "redheart.jpg", "starwand.png"];
        stampPaths.forEach((path, index) => {
            const button = createButton(`Stamp ${index + 1}`);
            button.position(10, 50 + index * 30);
            button.mousePressed(() => {
                const stampImage = loadImage(`assets/${path}`);
                this.stampModel.selectStamp(stampImage);
            });
            this.stampButtons.push(button);
        });

        // deselect button for user to unselect a stamp previously chosen 
    } 
}