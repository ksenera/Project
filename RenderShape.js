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

        if (shape.type === 'rectangle') {
            let x1 = shape.startX;
            let y1 = shape.startY;
            let x2 = shape.endX;
            let y2 = shape.endY;
    
            if (x2 < x1) [x1, x2] = [x2, x1];
            if (y2 < y1) [y1, y2] = [y2, y1];
    
            canvas.rectMode(CORNERS);
            canvas.rect(x1, y1, x2, y2);
        } else if (shape.type === 'ellipse') {
            const width = Math.abs(shape.endX - shape.startX);
            const height = Math.abs(shape.endY - shape.startY);
            const centerX = (shape.startX + shape.endX) / 2;
            const centerY = (shape.startY + shape.endY) / 2;
    
            canvas.ellipseMode(CENTER);
            canvas.ellipse(centerX, centerY, width, height);
        }
        
        canvas.pop();
    }
    
}