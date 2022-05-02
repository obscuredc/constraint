import { renderer } from "../../engine/renderer.js"
import { states } from "../meta/gamestate.js"
import { ctx, canvas, utils } from "../../engine/utils.js"

export let PauseMenu_Resume = new renderer.Button(0, 0, 100, 50)
PauseMenu_Resume.setrender((x, y, w, h) => {
    ctx.fillStyle = "rgb(50, 50, 50)"
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    ctx.fillStyle = 'rgb(99, 113, 237)';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'black';
})
PauseMenu_Resume.setonclick(() => {
    pause()
})
PauseMenu_Resume.hide()
PauseMenu_Resume.center()
PauseMenu_Resume.y -=20;
PauseMenu_Resume.fix_hitbox()

export let PauseMenu_Logo = new renderer.Generic(0, 0, 256, 64)
PauseMenu_Logo.setrender((x, y, w, h) => {
    let image = new Image(3480, 954);
    image.src = "asset/texture/logo_small.png";
    ctx.drawImage(image, x, y, w, h)
})
PauseMenu_Logo.center()
PauseMenu_Logo.hide()
PauseMenu_Logo.y -= 200
PauseMenu_Logo.fix_hitbox()

export let PauseMenu_Container = new renderer.Container([ PauseMenu_Resume, PauseMenu_Logo ])
PauseMenu_Container.hide()

//toggles
export function pause() {
    if(states.isPaused == true) {
        PauseMenu_Container.hide()
        states.currentGUI = "";
        utils.post("➡️updated isPaused to false")
    } else {
        PauseMenu_Container.show()
        states.acceptMovement = false;
        states.currentGUI = "PauseMenu";
        utils.post("➡️updated isPaused to true")
    }
    states.isPaused = !states.isPaused;
}
utils.post("✅gui/PauseMenu")