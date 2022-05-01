import { canvas, utils } from "./utils.js"

export const Scheduler = () => {
    Update({ type: 'None' })
    setTimeout(Scheduler, 1000 / utils.fps)
}

import { pause } from "../asset/gui/PauseMenu.js"
import { Render, renderer } from "./renderer.js"
let Update = (ev) => {
    //do math updates, update speeds of bullets and entities
    if (ev.type == "mouseclickright" || ev.type == "mouseclickleft") {
        renderer.clickGUI(ev.x, ev.y)
    } else if (ev.type == "keypress") {
        if (ev.key == "Escape") pause()
    }
    //rendering
    Render()
}

//attach some events
document.addEventListener("keydown", (event) => {
    Update({ type: 'keypress', key: event.key })
})
canvas.addEventListener("mousedown", (event) => {
    event.button == 0 ? Update({ type: 'mouseclickleft', x: event.x, y: event.y }) : Update({ type: 'mouseclickright', x: event.x, y: event.y })
})
canvas.addEventListener("mousemove", (event) => {
    Update({ type: 'mousemove', x: event.x, y: event.y })
}) //for highlighting a button when going over it, etc

console.log("✅engine/update")