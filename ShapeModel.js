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

    startShape(type, startX, startY, fillColor, strokeColor, strokeWeight) {
        this.currentShape = {
            type,
            startX,
            startY,
            endX: startX,
            endY: startY,
            fillColor,
            strokeColor,
            strokeWeight,
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
            this.currentShape = null;
        }
    }

    renderShapes() {
        for (const shape of this.shapes) {
            noFill();
            if (shape.fillColor) fill(shape.fillColor);
            stroke(shape.strokeColor);
            strokeWeight(shape.strokeWeight);

            if (shape.type === 'rectangle') {
                rect(shape.startX, shape.startY, shape.endX, shape.endY);
            } else if (shape.type === 'ellipse') {
                ellipse(shape.startX, shape.startY, shape.endX, shape.endY);
            }
        }
    }

    renderCurrentShape() {
        if (!this.currentShape) return;

        noFill();
        if (this.currentShape.fillColor) fill(this.currentShape.fillColor);
        stroke(this.currentShape.strokeColor);
        strokeWeight(this.currentShape.strokeWeight);

        if (this.currentShape.type === 'rectangle') {
            rect(this.currentShape.startX, this.currentShape.startY, mouseX, mouseY);
        } else if (this.currentShape.type === 'ellipse') {
            ellipse(this.currentShape.startX, this.currentShape.startY, mouseX, mouseY);
        }
    }
}
