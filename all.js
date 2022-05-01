let utils = {
    Hitbox: class {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        collidesWith(hitbox) {
            if (!hitbox instanceof Hitbox) throw new Error()
            if (hitbox.x < this.x + this.w && hitbox.x + hitbox.w > this.x && hitbox.y < this.y + this.h && hitbox.y + hitbox.h > this.y) {
                return true;
            }
            return false;
        }
        collidesPoint(x, y) {
            if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) return true;
            return false;
        }
    },
    fps: 30,
    texture: (source) => {
        let image = new Image(32, 32);
        image.src = source;
        return image;
    }
}

const canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let renderer = {
    list: [],
    drawGUI: () => {
        let active = renderer.list.filter((T) => T.active == true)
        active.forEach((T) => T.render())
    },
    clickGUI: (x, y) => {
        let active = renderer.list.filter((T) => T.active == true && T.clickable == true)
        active.forEach((T) => T.trigger(x, y))
    }
}

renderer.Generic = class {
    constructor(x, y, w, h) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.Hitbox = new utils.Hitbox(x, y, w, h);
        this.active = true;
        renderer.list.push(this); //im part of the group
        this.onrenderfn = undefined;
        return this;
    }
    show() {
        this.active = true;
    }
    hide() {
        this.active = false;
    }
    setrender(fn) {
        this.onrenderfn = fn;
        return this;
    }
    render() {
        this.onrenderfn(this.x, this.y, this.w, this.h)
    }
    destroy() {
        this.hide()
        delete this;
    }
}

renderer.Button = class extends renderer.Generic {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.clickable = true;
        this.onclickfn = undefined;
        return this;
    }
    setonclick(fn) {
        this.onclickfn = fn;
        return this;
    }
    trigger(x, y) {
        if (this.Hitbox.collidesPoint(x, y) && this.clickable == true) {
            this.onclickfn()
            //yes i evaluated user code deal with it
        }
    }
}

renderer.container = class {
    constructor(elements) {
        this.elements = elements;
        return this;
    }
    destroy() {
        this.elements.forEach((e) => e.destroy())
        delete this;
    }
    show() {
        this.elements.forEach((e) => e.show())
    }
    hide() {
        this.elements.forEach((e) => e.hide())
    }
}

const Scheduler = () => {
    Update({ type: 'None' })
    setTimeout(Scheduler, 1000 / utils.fps)
}

let Update = (ev) => {
    //do math updates, update speeds of bullets and entities
    if(ev.type == "mouseclickright" || ev.type == "mouseclickleft") {
        renderer.clickGUI(ev.x, ev.y)
    } else if (ev.type == "keypress") {
        if (ev.key == "Escape") game.state.isPaused = !game.state.isPaused;
    }
    //rendering
    Render()
}

let Render = () => {
    //clear
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    //draw
    renderer.drawGUI()
}

//attach some events
document.addEventListener("keypress", (event) => {
    Update({type: 'keypress', key: event.key})
})
canvas.addEventListener("mousedown", (event) => {
    event.button == 0 ? Update({ type: 'mouseclickleft', x: event.x, y: event.y }) : Update({ type: 'mouseclickright', x: event.x, y: event.y })
})
canvas.addEventListener("mousemove", (event) => {
    Update({ type: 'mousemove', x: event.x, y: event.y })
}) //for highlighting a button when going over it, etc

//GAME FETCH COMPRESSED CONTENT--------------------------
let gui0 = new renderer.Button(utils.cx-25, utils.cy-25, 50, 50).setrender((x,y,w,h) => {ctx.fillRect(x,y,w,h)})
let gui1 = new renderer.container([gui0])

let game = {
    state: {
        isPaused: false
    },
    fetch: (name) => {
        //better solution to come, hopefully
        if(name == "guis/pausemenu/mainbutton") return gui0;
        if(name == "guis/pausemenu") return gui1;
    }
}



//call once to begin cycle
Scheduler()