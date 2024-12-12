/** 
 * CLASS       : ShapeModel.js 
 * 
 * DESCRIPTION : Model class that manages shape drawing logic for rectangles and ellipses.
 *               Methods create, update, and render the finalized shapes. 
 * 
 */

class ShapeModel {
    constructor(videoWidth, videoHeight, sharedCanvas) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.shapes = []; 
        this.currentShape = null; 
        this.currentTool = null;
        this.fillColor = '#FFFFFF';
        this.borderColor = '#000000';
        this.borderThickness = 1;
        this.drawingCanvas = sharedCanvas;
    }

    /**
     * 
     * SET METHODS to set the current tool, fill color, and border color and thickness.
     * 
     */
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
     * FUNCTION      : startShape()
     * DESCRIPTION   : Draws a new shape by setting parameters. 
     * PARAMETERS    : 
     *                  type - either rectangle or ellipse.
     *                  startX - the x-coordinate where the mouse clicks first corner of the shape. 
     *                  startY - The y-coordinate where the mouse clicks first corner of the shape.
     * RETURNS       : None.
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
     * FUNCTION      : updateShape()
     * DESCRIPTION   : As the user drags the mouse, the shape is updated with end corner coordinates.
     * PARAMETERS    : 
     *                  endX - The updated x-coordinate of the corner after mouse drag.
     *                  endY - The updated y-coordinate of the corner after mouse drag.
     * RETURNS       : None.
     */
    updateShape(endX, endY) {
        if (this.currentShape) {
            this.currentShape.endX = endX;
            this.currentShape.endY = endY;
        }
    }

    /**
     * FUNCTION      : finalizeShape()
     * DESCRIPTION   : Finalizes current shape by adding to shapes array. 
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    finalizeShape() {
        if (this.currentShape) {
            this.shapes.push(this.currentShape);
            RenderShape.renderShape(this.drawingCanvas, this.currentShape);
            this.currentShape = null;
        }
    }

    /**
     * FUNCTION      : renderCurrentShape()
     * DESCRIPTION   : Shows user visual feedback of the current shape being drawn.
     * PARAMETERS    : 
     *                  mousePosition - the current position of the mouse during visual feedback.
     * RETURNS       : None.
     */
    renderCurrentShape(mousePosition) {
        if (!this.currentShape || !mousePosition) return;

        RenderShape.renderShape(null, {
            ...this.currentShape,
            endX: mousePosition.x,
            endY: mousePosition.y,
        });
    }

    /**
     * FUNCTION      : updateCanvasSize()
     * DESCRIPTION   : Updates the canvas size for the shapes.
     * PARAMETERS    : 
     *                  videoWidth - video stream width
     *                  videoHeight - video stream height
     * RETURNS       : None.
     */
    updateCanvasSize(videoWidth, videoHeight) {
        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;
        this.shapesCanvas = createGraphics(videoWidth, videoHeight);
        this.shapesCanvas.clear();


        this.shapes.forEach(shape => {
            RenderShape.renderShape(this.shapesCanvas, shape);
        });
    } 

    /**
     * FUNCTION      : clearShapes()
     * DESCRIPTION   : Clears all shapes and resets the shared canvas. 
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    clearShapes() {
        this.shapes = [];
        this.drawingCanvas.clear();
        stampModel.stamps.forEach(stamp => {
            this.drawingCanvas.image(
                stamp.image,
                stamp.position.x,
                stamp.position.y,
                stampModel.stampWidth,
                stampModel.stampHeight
            );
        });
    }

    /**
     * FUNCTION      : redrawShapes()
     * DESCRIPTION   : Redraws all shapes.
     * PARAMETERS    : None.
     * RETURNS       : None.
     */
    redrawShapes() {
        this.drawingCanvas.clear();
        this.shapes.forEach(shape => {
            RenderShape.renderShape(this.drawingCanvas, shape);
        });
    }
}
