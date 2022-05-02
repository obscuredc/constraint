import { renderer } from "../../engine/renderer.js"
import { states } from "../meta/gamestate.js"
import { ctx, canvas, utils } from "../../engine/utils.js"

export let StartMenu_Start = new renderer.Button(0, 0, 100, 50)
StartMenu_Start.setrender((x, y, w, h) => {
    ctx.fillStyle = "rgb(50, 50, 50)"
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.fillStyle = 'rgb(99, 113, 237)';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'black';
})
StartMenu_Start.setonclick(() => {
    Start()
})
StartMenu_Start.center()
StartMenu_Start.y -= 20;
StartMenu_Start.fix_hitbox()

export let StartMenu_Logo = new renderer.Generic(0, 0, 256, 64)
StartMenu_Logo.setrender((x, y, w, h) => {
    let image = new Image(3480, 954);
    image.src = "asset/texture/logo_small.png";
    ctx.drawImage(image, x, y, w, h)
})
StartMenu_Logo.center()
StartMenu_Logo.y -= 200
StartMenu_Logo.fix_hitbox()

export let StartMenu_Container = new renderer.Container([StartMenu_Start, StartMenu_Logo])
StartMenu_Container.show()

function Start() {
    states.currentGUI = "";
    StartMenu_Container.destroy()
    utils.post("➡️started")
}
utils.post("✅gui/StartMenu")