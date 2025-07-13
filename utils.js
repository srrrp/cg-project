class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    some(cb) {
        return cb(this.x) || cb(this.y);
    }

    divide(rightHand, target) {
        target.x = this.x / rightHand.x;
        target.y = this.y / rightHand.y;
    }

    add(rightHand, target) {
        target.x = this.x + rightHand.x;
        target.y = this.y + rightHand.y;
    }

    sub(rightHand, target) {
        target.x = this.x - rightHand.x;
        target.y = this.y - rightHand.y;
    }

    addScalar(scalar, target) {
        target.x = this.x + scalar;
        target.y = this.y + scalar;
    }

    multiplyScalar(scalar, target) {
        target.x = this.x * scalar;
        target.y = this.y * scalar;
    }

    divideScalar(scalar, target) {
        target.x = this.x / scalar;
        target.y = this.y / scalar;
    }

    clone() {
        return new Vec2(this.x, this.y);
    }
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }
}

const clearCanvas = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

function unimportantCanvasDrawStuff(ctx) {
    clearCanvas(ctx);
}