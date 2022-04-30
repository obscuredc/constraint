/**
 * 
 * 
 * ENGINE APIS
 * 
 * 
 */

let s = {};
s.models = {
    Hitbox: class {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        collidesWith(hitbox) {
            if (!hitbox instanceof s.models.Hitbox) throw new Error("ΣEngine: tried to compare hitbox to non hitbox")
            if(hitbox.x < this.x + this.w && hitbox.x + hitbox.w > this.x && hitbox.y < this.y + this.h && hitbox.y + hitbox.h > this.y) {
                return true;
            }
            return false;
        }
        collidesPoint(x, y) {
            if(x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) return true;
            return false;
        }
    }
}
s.utils = {
    fps: 30,
    end: false,
    SetCanvas: (canvas) => {
        if (!canvas instanceof HTMLCanvasElement) throw new Error("ΣEngine: expected HTMLCanvasElement, got other")
        s.utils.ctx = canvas.getContext("2d");
        canvas.onclick = (event) => {s.handlers.ClickHandler(event.x, event.y)}
    },
    ctx: null,
    drawStack: [],
    clickeventStack: [],
    keyeventStack: []
}
s.gui = {
    put: (image_url, x, y) => {
        let image = new Image(16, 16);
        image.src = image_url;
        s.utils.ctx.drawImage(image, x, y);
    }
}

s.handlers = {
    ClickHandler: (x, y) => {
        s.utils.clickeventStack.forEach((e) => {
            e.click(x, y)
        })
        s.Update();
    },
    KeyHandler: (k) => {
        s.utils.keyeventStack.forEach((e)=> {
            e.key(k)
        })
        s.Update();
    }
}
s.Update = () => {
    //actually preform actions but is scheduled differently than Frame().
    s.utils.drawStack.forEach((e) => {
        e.draw();
    })
}
s.Frame = () => {
    if(s.utils.end) return;
    s.Update()
    setTimeout(s.Frame, 1000/s.utils.fps)
}
s.Start = () => {
    s.utils.end = false; //incase
    s.Frame();
}
s.Pause = () => {
    s.utils.end = true;
}

/**
 * 
 * 
 * GAME APIS
 * 
 * 
 */

/**
 * 
 * 
 * USAGE
 * 
 * 
 */

s.utils.SetCanvas(document.getElementById("game"))
document.addEventListener("keypress", (event) => {s.handlers.KeyHandler(event.key)})
s.Start()