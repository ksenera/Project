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
}