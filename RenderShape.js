/** 
 * CLASS       : RenderShape.js 
 * 
 * DESCRIPTION : Class to help keep logic separate and modular to render shapes in ShapeModel.cs.
 * 
 */


class RenderShape {
    /**
     * FUNCTION      : renderShape()
     * DESCRIPTION   : Renders a rectangle or ellipse on shared drawing canvas.
     * PARAMETERS    : 
     *                  targetCanvas - shared drawing canvas passed in from ShapeModel.js
     *                  shape - the shape to render
     * RETURNS       : None.
     */
    static renderShape(targetCanvas, shape) {
        const canvas = targetCanvas || window; 
        canvas.push();

        if (shape.fillColor) canvas.fill(shape.fillColor);
        if (shape.strokeColor) canvas.stroke(shape.strokeColor);
        if (shape.strokeWeight === 0) canvas.noStroke();
        else canvas.strokeWeight(shape.strokeWeight);

        if (shape.endX !== shape.startX || shape.endY !== shape.startY) {
            if (shape.type === 'rectangle') {
                canvas.rectMode(CORNERS);
                canvas.rect(shape.startX, shape.startY, shape.endX, shape.endY);
            } else if (shape.type === 'ellipse') {

                // ensures the shape is drawn correctly to avoid negative radius errors. 
                const width = Math.abs(shape.endX - shape.startX);
                const height = Math.abs(shape.endY - shape.startY);
                const x = Math.min(shape.startX, shape.endX);
                const y = Math.min(shape.startY, shape.endY);
                
                canvas.ellipseMode(CENTER);
                canvas.ellipse(x + width/2, y + height/2, width, height);
            }
        }
        canvas.pop();
    }
}