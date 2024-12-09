/** 
 * CLASS       : UIController.js
 * 
 * DESCRIPTION : Controller class that controls the UI 
 * 
 */

class UIController {
    constructor(filterModel) {
        this.filterModel = filterModel;
        this.filterSelector = createSelect();

        // adding ui controls for stamp model 
        this.stampModel = this.stampModel;
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

        // deselect button for user to unselect a stamp previously chosen 
    } 
}