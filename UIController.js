/** 
 * CLASS       : UIController.js
 * 
 * DESCRIPTION : Controller class that controls the UI 
 * 
 */

class UIController {
    constructor(filterModel, stampModel, shapeModel) {
        this.filterModel = filterModel;
        // this.filterSelector = createSelect();

        // adding ui controls for stamp model 
        this.stampModel = stampModel;
        this.stampButtons = [];
        //this.stampButtons = [];

        this.shapeModel = shapeModel;

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

        const toolSection = createDiv().addClass('control-section');
        toolSection.parent(controlPanel);

        const toolLabel = createElement('label', 'Tool Selection:');
        toolLabel.parent(toolSection);

        // introducing all tools selectors here
        this.toolSelector = createSelect();
        this.toolSelector.parent(toolSection);
        this.toolSelector.option("stamp");
        this.toolSelector.option("rectangle");
        this.toolSelector.option("ellipse");
        this.toolSelector.changed(() => {
            this.selectTool(this.toolSelector.value());
        });

        // for the shapes drawing tools here is color for borders and fills
        const colorSection = createDiv().addClass('control-section');
        colorSection.parent(controlPanel);  

        const borderColorLabel = createElement('label', 'Border Color:');
        borderColorLabel.parent(colorSection);

        this.borderColorPicker = createColorPicker('#000000');
        this.borderColorPicker.parent(colorSection);
        this.borderColorPicker.input(() => {
            this.shapeModel.setBorderColor(this.borderColorPicker.value());
        });

        const fillColorLabel = createElement('label', 'Fill Color:');
        fillColorLabel.parent(colorSection);

        this.fillColorPicker = createColorPicker('#FF0000');
        this.fillColorPicker.parent(colorSection);
        this.fillColorPicker.input(() => {
            this.shapeModel.setFillColor(this.fillColorPicker.value());
        });

        // for the border user can select 4 borders including NONE
        const thicknessSection = createDiv().addClass('control-section');
        thicknessSection.parent(controlPanel);

        const thicknessLabel = createElement('label', 'Border Thickness:');
        thicknessLabel.parent(thicknessSection);

        this.thicknessSelector = createSelect();
        this.thicknessSelector.parent(thicknessSection);
        this.thicknessSelector.option("None");
        this.thicknessSelector.option("1");
        this.thicknessSelector.option("2");
        this.thicknessSelector.option("3");
        this.thicknessSelector.option("4");
        this.thicknessSelector.option("5");
        this.thicknessSelector.selected("1");
        this.thicknessSelector.changed(() => {
            const value = this.thicknessSelector.value();
            this.shapeModel.setBorderThickness(value === "None" ? 0 : parseInt(value));
        });

        // existing stamp selection logic 

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

        let tempCanvas = createGraphics(50, 50);
        tempCanvas.image(img, 0, 0, 50, 50);
        const dataURL = tempCanvas.elt.toDataURL();
        button.style('background-image', `url(${dataURL})`);
        button.style('background-size', 'cover');
        button.style('background-position', 'center');
        button.style('background-repeat', 'no-repeat');

        button.size(50, 50);

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

                const imgPath = `assets/stamp${selectedIndex + 1}.png`;
                loadImage(imgPath, (img) => {
                    this.stampModel.selectStamp(img);
                });
            } else {
                button.removeClass('selected');
            }
        });

        this.toolSelector.value('stamp');
        this.shapeModel.setCurrentTool('stamp');
    }

   /**
     * Function: selectTool() 
     * Description: 
     * Parameters:
     * Return: 
     */
    selectTool(tool) {
        if (tool === 'stamp') {
            this.stampContainer.show();
        } else {
            this.stampContainer.hide();
            this.stampButtons.forEach(button => button.removeClass('selected'));
            this.stampModel.deselectStamp();
            this.shapeModel.setCurrentTool(tool);
        }
    }
}