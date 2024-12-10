/** 
 * CLASS       : UIController.js
 * 
 * DESCRIPTION : Controller class that controls the UI 
 * 
 */

class UIController {
    constructor(filterModel, stampModel) {
        this.filterModel = filterModel;
        // this.filterSelector = createSelect();

        // adding ui controls for stamp model 
        this.stampModel = stampModel;
        this.stampButtons = [];
        //this.stampButtons = [];

        this.initUI();
    }

    // temporary initializer just for the filter drop down menu.
    // adding the stamp functionality to this initializer will focus on GUI
    // after functionality works 
    initUI() {
        const controlPanel = select('#control-panel');

        const filterSection = createDiv().addClass('control-section');
        filterSection.parent(controlPanel);

        const filterLabel = createElement('label', 'Filter Selection:');
        filterLabel.parent(filterSection);

        this.filterSelector = createSelect();
        this.filterSelector.parent(filterSection);
        this.filterSelector.option("none");
        this.filterSelector.option("invert");
        this.filterSelector.option("gray");
        this.filterSelector.option("posterize");
        this.filterSelector.option("blur");
        this.filterSelector.changed(() => {
            this.filterModel.setCurrentFilter(this.filterSelector.value());
        });

        const stampSection = createDiv().addClass('control-section');
        stampSection.parent(controlPanel);

        const stampLabel = createElement('label', 'Stamp Selection:');
        stampLabel.parent(stampSection);

        const stampContainer = createDiv().addClass('stamp-container');
        stampContainer.parent(stampSection);

        const numberOfStamps = 4;
        for (let i = 1; i <= numberOfStamps; i++) {
            const imgPath = `assets/stamp${i}.png`;
            loadImage(imgPath, (img) => {
                this.createStampButton(img, i - 1, stampContainer);
            }, () => {
                console.error(`Failed to load image: ${imgPath}`);
            });
        } 
    }

    /**
     * Function: createStampButton()
     * Description: creates a stamp button with the stamp image so user knows 
     *              which stamp they are selecting 
     * Parameters:  img - the stamp to be display in the button 
     *              index - the index of the stamp 
     *              container - 
     * Return:
     */

    createStampButton(img, index, container) {

        const button = createButton('');
        button.parent(container);
        button.class('stamp-button');

        button.style('background-image', `url(${img.canvas.toDataURL()})`);
        button.style('background-size', 'cover');
        button.style('background-position', 'center');
        button.style('background-repeat', 'no-repeat');

        button.size(150, 150);

        button.mousePressed(() => {
            this.selectStamp(index); 
        });

        this.stampButtons.push(button);
    }

    /**
     * Function: selectStamp() 
     * Description: 
     * Parameters:
     * Return: 
     */

    selectStamp(selectedIndex) {
        this.stampButtons.forEach((button, index) => {
            if (index === selectedIndex) {
                button.addClass('selected');

                const imgURL = button.style('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                loadImage(imgURL, (img) => {
                    this.stampModel.selectStamp(img);
                });
            } else {
                button.removeClass('selected');
            }
        });
    }
}