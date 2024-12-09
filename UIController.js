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
      this.initUI();
    }

    // temporary initializer just for the filter drop down menu.
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
    } 
}