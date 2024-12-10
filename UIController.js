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
        //this.stampButtons = [];

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

        const numberOfStamps = 4;
        for (let i = 1; i <= numberOfStamps; i++) {
            const imgPath = `assets/stamp${i}.png`;
            const img = loadImage(imgPath, () => {
                this.createStampButton(img, i);
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
     * Return:
     */


    createStampButton(img, index) {
        const button = createButton('');
        button.position(10, 50 + (index - 1) * 60); 
        button.size(100, 100); 

        button.style('background-image', `url(${img.canvas.toDataURL()})`);
        button.style('background-size', 'cover');
        button.style('background-position', 'center');
        button.style('background-repeat', 'no-repeat');
        button.style('border', '2px solid transparent'); 
        button.style('cursor', 'pointer'); 

        button.mousePressed(() => {
            this.selectStamp(index - 1); 
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
                button.style('border', '2px solid red');

                const selectedImage = button.elt.style.backgroundImage.slice(5, -2); 
                loadImage(selectedImage, (img) => {
                    this.stampModel.selectStamp(img);
                });
            } else {
                button.style('border', '2px solid transparent');
            }
        });
    }

}