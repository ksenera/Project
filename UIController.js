/** 
 * CLASS       : UIController.js
 * 
 * DESCRIPTION : Controller class that controls the UI 
 * 
 */

class UIController {
    constructor(filterModel, stampModel) {
        this.filterModel = filterModel;

        // adding ui controls for stamp model 
        this.stampModel = stampModel;
        this.stampButtons = [];

        this.initUI();
    }

    // temporary initializer just for the filter drop down menu.
    // adding the stamp functionality to this initializer will focus on GUI
    // after functionality works 
    initUI() {
        // container div for UI elements 
        this.uiContainer = select('#ui-container');

        // for the filter selection 
        this.filterSelector = createSelect();
        this.filterSelector.id('filter-selector'); // in style.css this is for filters
        this.filterSelector.parent(this.uiContainer);
        this.filterSelector.option("none");
        this.filterSelector.option("invert");
        this.filterSelector.option("gray");
        this.filterSelector.option("posterize");
        this.filterSelector.option("blur");

        // if the filter is selected handle how it changes the video stream 
        this.filterSelector.changed(() => {
          this.filterModel.setCurrentFilter(this.filterSelector.value());
        });

        // initialize stamp buttons
        this.createStampButtons();
    }         
    createStampButtons() {
        const stampButtonsContainer = createDiv();
        stampButtonsContainer.id('stamp-buttons');
        stampButtonsContainer.parent(this.uiContainer);

        const stamps = [catImage, rainbowImage, heartImage, wandImage];
        stamps.forEach((img, index) => {
            const button = createButton('');
            button.class('stamp-button');
            button.parent(stampButtonsContainer);

            button.style('background-image', `url(${img.canvas.toDataURL()})`);

            button.mousePressed(() => {
                this.stampModel.selectStamp(img);
                this.updateStampButtonSelection(button);
            });

            this.stampButtons.push(button);
        });
    }

    // UI will show which stamp button is selected 
    updateStampButtonSelection(selectedButton) {
        this.stampButtons.forEach(button => {
            if (button === selectedButton) {
                button.addClass('selected');
            } else {
                button.removeClass('selected');
            }
        });
    }
    
    // deselect button for user to unselect a stamp previously chosen 
}