/** 
 * CLASS       : UIController.js
 * 
 * DESCRIPTION : Controller class that controls the UI, such as element tool selection, 
 *               picking colors for the border and fills, stamp selection, and reset button.
 * 
 */

class UIController {
    constructor(filterModel, stampModel, shapeModel) {
        this.filterModel = filterModel;

        // adding ui controls for stamp model 
        this.stampModel = stampModel;
        this.stampButtons = [];

        this.shapeModel = shapeModel;
        this.currentTool = 'stamp';

        this.initUI();
    }

    /**
     * FUNCTION      : initUI()
     * DESCRIPTION   : Initializes the user interface components: filter selection, 
     *                  tool selection, color selection, border thickness selection, 
     *                  and stamp selection. 
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    initUI() {
        const controlPanel = select('#control-panel');

        // filter selection 
        const filterSection = createDiv().addClass('control-section');
        filterSection.parent(controlPanel);

        createElement('label', 'Filter Selection:').parent(filterSection);

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

        createElement('label', 'Tool Selection:').parent(toolSection);

        // introducing all tools selectors here
        const rectangleButton = createButton('Rectangle').parent(toolSection);
        rectangleButton.mousePressed(() => this.selectTool('rectangle'));

        const ellipseButton = createButton('Ellipse').parent(toolSection);
        ellipseButton.mousePressed(() => this.selectTool('ellipse'));

        // for the shapes drawing tools here is color for borders and fills
        const colorSection = createDiv().addClass('control-section');
        colorSection.parent(controlPanel);  

        createElement('label', 'Border Color:').parent(colorSection);
        this.borderColorPicker = createColorPicker('#000000').parent(colorSection);
        this.borderColorPicker.input(() => {
            this.shapeModel.setBorderColor(this.borderColorPicker.value());
        });

        createDiv().style('margin-top', '10px').parent(colorSection);

        createElement('label', 'Fill Color:').parent(colorSection);
        this.fillColorPicker = createColorPicker('#FFFFFF').parent(colorSection);
        this.fillColorPicker.input(() => {
            this.shapeModel.setFillColor(this.fillColorPicker.value());
        });

        // for the border user can select 4 borders including NONE
        const thicknessSection = createDiv().addClass('control-section');
        thicknessSection.parent(controlPanel);

        createElement('label', 'Border Thickness:').parent(thicknessSection);

        this.thicknessSelector = createSelect();
        this.thicknessSelector.parent(thicknessSection);
        this.thicknessSelector.option("None");
        this.thicknessSelector.option("1");
        this.thicknessSelector.option("2");
        this.thicknessSelector.option("3");
        this.thicknessSelector.selected("1");
        this.thicknessSelector.changed(() => {
            const value = this.thicknessSelector.value();
            this.shapeModel.setBorderThickness(value === "None" ? 0 : parseInt(value));
        });

        // existing stamp selection logic 
        const stampSection = createDiv().addClass('control-section');
        stampSection.parent(controlPanel);

        createElement('label', 'Stamp Selection:').parent(stampSection);
        this.stampContainer = createDiv().addClass('stamp-container').parent(stampSection);

        const numberOfStamps = 4;
        for (let i = 1; i <= numberOfStamps; i++) {
            const imgPath = `assets/stamp${i}.png`;
            loadImage(imgPath, (img) => {
                this.createStampButton(img, i - 1, this.stampContainer);
            });
        } 

        // reset button 
        const resetSection = createDiv().addClass('control-section');
        resetSection.parent(controlPanel);

        const resetButton = createButton('Reset').parent(resetSection);
        resetButton.mousePressed(() => this.resetCanvas()); 
    }


    /**
     * FUNCTION      : createStampButton
     * DESCRIPTION   : Creates a stamp button with the stamp image. 
     * PARAMETERS    : 
     *                  img - image of the stamp
     *                  index - index of the stamp
     *                  container - container to which the button should be appended
     * RETURNS       : None.
     */
    createStampButton(img, index, container) {
        const button = createButton('').parent(container).class('stamp-button');
        const tempCanvas = createGraphics(50, 50);
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
     * FUNCTION      : selectStamp()
     * DESCRIPTION   : Selects a stamp and updates the stamp model.
     * PARAMETERS    : 
     *                  selectedIndex - index of the stamp to select
     * RETURNS       : None.
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

        this.deselectOtherTools();
        this.currentTool = 'stamp';
    }

   /**
     * FUNCTION      : selectTool()
     * DESCRIPTION   : Selects a tool and updates the shape model.
     * PARAMETERS    : 
     *                  tool - the tool to select
     * RETURNS       : None.
     */
    selectTool(tool) {
        console.log(`Tool selected: ${tool}`); 
        this.deselectStamps();
        this.currentTool = tool;
        if (this.shapeModel) {
            this.shapeModel.setCurrentTool(tool);
        }
    }

    /**
     * FUNCTION      : deselectStamps()
     * DESCRIPTION   : Deselects all stamps.
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    deselectStamps() {
        this.stampButtons.forEach((button) => button.removeClass('selected'));
        this.stampModel.deselectStamp();
    }

    /**
     * FUNCTION      : deselectOtherTools()
     * DESCRIPTION   : Deselects all other tools.
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    deselectOtherTools() {
        this.shapeModel.setCurrentTool(null);
    }

    /**
     * FUNCTION      : resetCanvas()
     * DESCRIPTION   : Resets the canvas, clears all shapes, stamps, and filters.
     * PARAMETERS    : None.
     * RETURNS       : None.
     */

    resetCanvas() {
        this.filterSelector.value('none');
        this.filterModel.setCurrentFilter('none');

        this.deselectStamps();
        this.stampModel.clearStamps();

        this.shapeModel.clearShapes();

        console.log('Canvas has been reset.');
    }
}
