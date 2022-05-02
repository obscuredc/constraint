import { Entity } from "./entity.js"

export class Player extends Entity {
    constructor(x, y, w, h) {
        super(x, y, w, h, "texture/player.png")
    }
}