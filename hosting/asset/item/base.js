export class BaseItem {
    constructor(id, texture, attributes) {
        if(FetchItem(id) != false) throw new Error(`A gameItem with id ${id} already exists!`);
        this.itemID = id;
        items.push(this)

        this.texture = texture;
        this.attr = attributes;
    }
}

//internal registry
let items = [];
export function FetchItem(itemID) {
    return items.find((T) => T.itemID == itemID) == undefined ? false : items.find((T) => T.itemID == itemID);
}