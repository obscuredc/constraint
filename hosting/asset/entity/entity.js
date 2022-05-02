import { utils, ctx } from "../../engine/utils.js"

let entity_id_counter = 0;

export function getNewID() {
    let T = entity_id_counter + 0;
    entity_id_counter++;
    return T;
}

export class Entity {
    constructor(x, y, w, h, texture) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.Hitbox = new utils.Hitbox(x, y, w, h);
        this.id = getNewID()
        this.texture = texture;
    }
    render() {
        //utils.texture() => assume 32x32. custom packs beware!
        ctx.drawImage(utils.texture(this.texture), x, y, w, h);
    }
    fix_hitbox() {
        this.Hitbox = new utils.Hitbox(this.x, this.y, this.w, this.h);
    }
}