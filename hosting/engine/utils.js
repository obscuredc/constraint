export let utils = {
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
    },
    toTileXY: (x, y) => {
        return [Math.floor(x / 64), Math.floor(y / 64)]
    },
    toEntityXY: (x, y) => {
        return [x*64, y*64]
    },
    post: (msg) => {
        utils.console.innerHTML += `<p>${msg}</p>`
    },
    console: document.getElementById("console")
}

export const canvas = document.getElementById("game");
export let ctx = canvas.getContext("2d");
utils.centerx = canvas.clientWidth / 2;
utils.centery = canvas.clientHeight / 2;

utils.post("✅engine/utils")