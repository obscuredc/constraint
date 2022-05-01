import { utils, ctx, canvas } from "./utils.js"

export let renderer = {
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
    }
    show() {
        this.active = true;
    }
    hide() {
        this.active = false;
    }
    setrender(fn) {
        this.onrenderfn = fn;
    }
    render() {
        this.onrenderfn(this.x, this.y, this.w, this.h)
    }
    destroy() {
        this.hide()
        delete this;
    }
    center() {
        this.x = utils.centerx - (this.w / 2)
        this.y = utils.centery - (this.h / 2)
        this.fix_hitbox()
    }
    fix_hitbox() {
        //since updating XYWH doesn't efefct hitbox u have to update manually :( sorry
        this.Hitbox = new utils.Hitbox(this.x, this.y, this.w, this.h);
    }
}

renderer.Button = class extends renderer.Generic {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.clickable = true;
        this.onclickfn = undefined;
    }
    setonclick(fn) {
        this.onclickfn = fn;
    }
    trigger(x, y) {
        if (this.Hitbox.collidesPoint(x, y) && this.clickable == true) {
            this.onclickfn()
            //yes i evaluated user code deal with it
        }
    }
}

renderer.Container = class {
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

export let Render = () => {
    //clear
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    //draw
    renderer.drawGUI()
}

console.log("✅engine/renderer")