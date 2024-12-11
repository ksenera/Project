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

    updateShape(endX, endY) {
        if (this.currentShape) {
            this.currentShape.endX = endX;
            this.currentShape.endY = endY;
        }
    }

    finalizeShape() {
        if (this.currentShape) {
            this.shapes.push(this.currentShape);
            // add call to utility class rendering shapes 
            this.currentShape = null;
        }
    }
}
