// Main thread
import { foo } from "./engine/pointer.js"
import { utils } from "./engine/utils.js"
import { Scheduler } from "./engine/update.js"
utils.post("✅main")
import { name } from "./asset/meta/version.js"
utils.post("🔢version " + name)
Scheduler()