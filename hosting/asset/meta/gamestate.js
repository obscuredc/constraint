export let states = {
    isPaused: false,        //self explanatory
    currentGUI: "StartMenu",//current GUI screen. set to "" if none
    acceptMovement: false,  //Send movement requests (WASD Space Etc) to the playermanager
    acceptMouseEvents: true //send mousemove/mouseclick events to handlers like GuiHandler
}