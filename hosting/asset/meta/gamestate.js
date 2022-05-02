export let states = {
    isPaused: false,        //self explanatory
    currentGUI: "StartMenu",//current GUI screen. set to "" if none
    acceptMovement: false,  //Send movement requests (WASD Space Etc) to the playermanager
    acceptMouseEvents: true //send mousemove/mouseclick events to handlers like GuiHandler
}

export function logable() {
    return `gamestate ---\nisPaused${states.isPaused == true ? "✅" : "❌"}\ncurrentGUI "${states.currentGUI}"\nacceptMovement${states.acceptMovement == true ? "✅" : "❌"}\nacceptMouseEvents${states.acceptMouseEvents == true ? "✅" : "❌"}`
}
import { utils } from "../../engine/utils.js"
utils.post("✅meta/gamestate")