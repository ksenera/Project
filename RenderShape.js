/** 
 * CLASS       : RenderShape.js 
 * 
 * DESCRIPTION : Class to help keep logic separate and modular to render shapes in ShapeModel
 * 
 */


class RenderShape {
    /**
     * Function: renderShape() 
     * Description: Renders a rectangle or ellipse 
     * 
     */
    static renderShape(targetCanvas, shape) {
        const canvas = targetCanvas || window; 
        canvas.push();
        canvas.noFill();
        if (shape.fillColor) canvas.fill(shape.fillColor);
        canvas.stroke(shape.strokeColor);
        canvas.strokeWeight(shape.strokeWeight);

        if (shape.type === 'rectangle') {
            canvas.rectMode(CORNERS);
            canvas.rect(shape.startX, shape.startY, shape.endX, shape.endY);
        } else if (shape.type === 'ellipse') {
            canvas.ellipseMode(CORNERS);
            canvas.ellipse(shape.startX, shape.startY, shape.endX, shape.endY);
        }
        canvas.pop();
    }
}