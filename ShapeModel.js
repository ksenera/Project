/** 
 * CLASS       : ShapeModel.js 
 * 
 * DESCRIPTION : 
 * 
 */

class ShapeModel {
    constructor(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.shapes = []; 
        this.currentShape = null; 
        this.currentTool = null;
        this.fillColor = '#FFFFFF';
        this.borderColor = '#000000';
        this.borderThickness = 1;
        this.shapesCanvas = createGraphics(videoWidth, videoHeight);
    }

    setCurrentTool(tool) {
        this.currentTool = tool;
    }

    setFillColor(color) {
        this.fillColor = color;
    }

    setBorderColor(color) {
        this.borderColor = color;
    }

    setBorderThickness(thickness) {
        this.borderThickness = thickness;
    }

    /**
     * Function: 
     * Description: 
     * Parameters:  
     * Return:
     */

    startShape(type, startX, startY) {
        this.currentShape = {
            type,
            startX,
            startY,
            endX: startX,
            endY: startY,
            fillColor: this.fillColor,
            strokeColor: this.borderColor,
            strokeWeight: this.borderThickness,
        };
    }

    /**
     * Function: 
     * Description: 
     * Parameters:  
     * Return:
     */
    updateShape(endX, endY) {
        if (this.currentShape) {
            this.currentShape.endX = endX;
            this.currentShape.endY = endY;
        }
    }

    /**
     * Function: 
     * Description: 
     * Parameters:  
     * Return:
     */
    finalizeShape() {
        if (this.currentShape) {
            this.shapes.push(this.currentShape);
            // add call to utility class rendering shapes 
            RenderShape.renderShape(this.shapesCanvas, this.currentShape);
            this.currentShape = null;
        }
    }

    /**
     * Function: renderCurrShape() 
     * Description: 
     * Parameters:  
     * Return:
     */

    renderCurrentShape(mousePosition) {
        if (!this.currentShape || !mousePosition) return;

        RenderShape.renderShape(null, {
            ...this.currentShape,
            endX: mousePosition.x,
            endY: mousePosition.y,
        });
    }

    getShapesCanvas() {
        return this.shapesCanvas;
    }

    updateCanvasSize(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.shapesCanvas = createGraphics(videoWidth, videoHeight);
        this.shapesCanvas.clear();


        this.shapes.forEach(shape => {
            RenderShape.renderShape(this.shapesCanvas, shape);
        });
    } 
}
