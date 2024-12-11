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

        let x1 = shape.startX;
        let y1 = shape.startY;
        let x2 = shape.endX;
        let y2 = shape.endY;

        if (x2 < x1) {
            [x1, x2] = [x2, x1];
        }
        if (y2 < y1) {
            [y1, y2] = [y2, y1];
        }

        if (shape.type === 'rectangle') {
            canvas.rectMode(CORNERS);
            canvas.rect(x1, y1, x2, y2);
        } else if (shape.type === 'ellipse') {
            canvas.ellipseMode(CORNERS);
            canvas.ellipse(x1, y1, x2, y2);
        }
        canvas.pop();
    }
}