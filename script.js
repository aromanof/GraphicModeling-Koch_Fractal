let rangeInput = document.getElementById("iteration-range");
let iteration;
let axiom = "F+F+F+F";
let F = "F+F-F-FF+F+F-F";
let lastAxiom;
let canvas;

function setup() {
    canvas = createCanvas(2000, 1800);
    canvas.drawingContext.lineWidth = 2;
    iterationChanged(0);
}

function iterationChanged(iteration){
    let pattern = createFractal(iteration);

    drawFractal(pattern, iteration);
}

function thicknessChanged(iteration, thickness){
    canvas.drawingContext.lineWidth = thickness;
    drawFractal(lastAxiom, iteration);
}

function colorChanged(iteration, thickness, color){
    canvas.drawingContext.lineWidth = thickness;
    canvas.drawingContext.strokeStyle = color;
    drawFractal(lastAxiom, iteration);
}

function createFractal(iteration){
    let current = axiom;
    let next = axiom;
    let found;

    let depth = 0;
    if (iteration == 0) {
        lastAxiom = next;
        return next
    } else {
        while (depth < iteration) {
            current = next
            next = "";

            for (let i = 0; i < current.split("").length; i++) {
                found = false;

                if (current[i] == 'F') {
                    next += F
                    found = true;
                }
                if (!found) {
                    next += current[i];
                }
            }
            depth++;
        }
        lastAxiom = next;
        return next;
    }
}

function drawFractal(pattern, iteration){
    clear();
    let dx = Math.pow(2, 6 - iteration);
    let dy = 0;
    let rx, ry, x = 400, y = 400;
    let radian;
    let angle = 90;

    for (let i = 0; i < pattern.split("").length; i++) {
        switch (pattern[i]) {
            case 'F':
                line(x, y, x + dx, y + dy);
                x += dx;
                y += dy;
                break;
            case '+':
                rx = dx;
                ry = dy;
                radian = Math.PI * angle / 180.0;
                dx = rx * Math.cos(radian) - ry * Math.sin(radian);
                dy = rx * Math.sin(radian) + ry * Math.cos(radian);
                break;
            case '-':
                rx = dx;
                ry = dy;
                radian = Math.PI * angle / 180.0;
                dx = rx * Math.cos(-radian) - ry * Math.sin(-radian);
                dy = rx * Math.sin(-radian) + ry * Math.cos(-radian);
                break;
            default:
                break;
        }
    }
}
