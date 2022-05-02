//point to everything to ensure loading

//ENGINE
import { renderer } from "./renderer.js"
import { Scheduler } from "./update.js"
import { utils } from "./utils.js"
//GUI
import { StartMenu_Container } from "../asset/gui/StartMenu.js";
import { PauseMenu_Container } from "../asset/gui/PauseMenu.js";
//META
import { states } from "../asset/meta/gamestate.js"
//ENTITY
import { Entity } from "../asset/entity/entity.js";
import { Player } from "../asset/entity/player.js";
//ITEM
import { BaseItem } from "../asset/item/base.js"

export const foo = "bar";