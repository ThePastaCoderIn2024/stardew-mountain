namespace SpriteKind {
    export const Text = SpriteKind.create()
    export const StatusBar = SpriteKind.create()
    export const Ball = SpriteKind.create()
    export const Booth = SpriteKind.create()
    export const Mouse = SpriteKind.create()
    export const Crosshair = SpriteKind.create()
    export const Moon = SpriteKind.create()
}
/**
 * column, row
 * 
 * img = 16x16
 * 
 * 4px padding
 * 
 * each grid cell 20x20
 */
function closeInventory () {
    inventoryVisible = false
    controller.moveSprite(thePlayer)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    currentTile = tiles.locationOfSprite(thePlayer)
    if (tiles.tileIs(currentTile, assets.tile`myTile0`)) {
        tiles.setTileAt(currentTile, assets.tile`myTile1`)
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    selectedIndex = Math.max(selectedIndex - 1, 0)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    selectedIndex = Math.min(selectedIndex + 1, tools.length - 1)
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (inventoryVisible) {
        closeInventory()
    } else {
        openInventory()
    }
})
function openInventory () {
    inventoryVisible = true
    controller.moveSprite(thePlayer, 0, 0)
    selectedIndex = 0
}
spriteutils.createRenderable(100, function (screen2) {
    if (inventoryVisible) {
        screen2.fillRect(10, 10, 140, 100, 13)
        screen2.drawRect(10, 10, 140, 100, 14)
        images.print(screen2, "Inventory", 14, 14, 15)
        images.print(screen2, tool_names[selectedIndex], 70, 14, 1)
        screen2.fillRect(14, 24, 132, 1, 15)
        toolTop = 28
        for (let index = 0; index <= tools.length - 1; index++) {
            spriteutils.drawTransparentImage(tools[index], screen2, 14 + index * 20, toolTop)
        }
        spriteutils.drawTransparentImage(assets.image`selector`, screen2, 14 + selectedIndex * 20 - 2, toolTop - 2)
    }
})
let toolTop = 0
let selectedIndex = 0
let currentTile: tiles.Location = null
let inventoryVisible = false
let tool_names: string[] = []
let tools: Image[] = []
let thePlayer: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
thePlayer = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . 5 . . 5 5 5 . . . . . . . . . 
    . . 5 2 5 5 5 5 . . . . . . . . 
    . . f 5 2 2 2 2 . . . . . . . . 
    . f f f 5 5 5 5 5 5 . . . . . . 
    f f f f f f f f . . . . . . . . 
    . . f f f f f f . . . . . . . . 
    . . . f f f c f f f f f f f f f 
    . . . f f c f f f f f f c f f . 
    . . . f f c f f f f f c f f . . 
    . . . . f f c c c c c f f . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . . 4 . 4 . . . . . . 
    . . . . . . . 4 . 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
character.loopFrames(
thePlayer,
[img`
    . . . . . . . . . . . . . . . . 
    . 5 . . 5 5 5 . . . . . . . . . 
    . . 5 2 5 5 5 5 . . . . . . . . 
    . . f 5 2 2 2 2 . . . . . . . . 
    . f f f 5 5 5 5 5 5 . . . . . . 
    f f f f f f f f . . . . . . . . 
    . . f f f f f f . . . . . . . . 
    . . . f f f c f f f f f f f f f 
    . . . f f c f f f f f f c f f . 
    . . . f f c f f f f f c f f . . 
    . . . . f f c c c c c f f . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . . 4 . 4 . . . . . . 
    . . . . . . . 4 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . 5 . . 5 5 5 . . . . . . . . . 
    . . 5 2 5 5 5 5 . . . . . . . . 
    . . f 5 2 2 2 2 . . . . . . . . 
    . f f f 5 5 5 5 5 5 . . . . . . 
    f f f f f f f f . . . . . . . . 
    . . f f f f f f . . . . . . . . 
    . . . f f f c f f f f f f f f f 
    . . . f f c f f f f f f c f f . 
    . . . f f c f f f f f c f f . . 
    . . . . f f c c c c c f f . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . . 4 . 4 . . . . . . 
    . . . . . . . 4 . 4 . . . . . . 
    . . . . . . . . . . . . . . . . 
    `],
200,
character.rule(Predicate.MovingLeft)
)
character.loopFrames(
thePlayer,
[img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . 5 5 5 . . 5 . 
    . . . . . . . . 5 5 5 5 2 5 . . 
    . . . . . . . . 2 2 2 2 5 f . . 
    . . . . . . 5 5 5 5 5 5 f f f . 
    . . . . . . . . f f f f f f f f 
    . . . . . . . . f f f f f f . . 
    f f f f f f f f f c f f f . . . 
    . f f c f f f f f f c f f . . . 
    . . f f c f f f f f c f f . . . 
    . . . f f c c c c c f f . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . 4 . 4 . . . . . . . 
    . . . . . . . . 4 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . 5 5 5 . . 5 . 
    . . . . . . . . 5 5 5 5 2 5 . . 
    . . . . . . . . 2 2 2 2 5 f . . 
    . . . . . . 5 5 5 5 5 5 f f f . 
    . . . . . . . . f f f f f f f f 
    . . . . . . . . f f f f f f . . 
    f f f f f f f f f c f f f . . . 
    . f f c f f f f f f c f f . . . 
    . . f f c f f f f f c f f . . . 
    . . . f f c c c c c f f . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . 4 . 4 . . . . . . . 
    . . . . . . 4 . 4 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `],
200,
character.rule(Predicate.MovingRight)
)
character.loopFrames(
thePlayer,
[img`
    . . . . . f f f f f f . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . f f f f f f f f . . . . 
    . . . . f f f f f f f f . . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f 5 5 5 5 f f f . . . 
    . . . . f 5 5 5 5 5 5 f . . . . 
    . . 5 5 2 5 5 5 5 5 5 2 5 5 . . 
    . . . 5 5 5 2 2 2 2 5 5 5 . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . . f . . . . . . . 
    `],
200,
character.rule(Predicate.MovingDown)
)
character.loopFrames(
thePlayer,
[img`
    . . . . . . 5 5 5 5 . . . . . . 
    . . . 5 5 2 5 5 5 5 2 5 5 . . . 
    . . 5 5 2 2 5 5 5 5 2 2 5 5 . . 
    . . . 5 5 5 2 2 2 2 5 5 5 . . . 
    . . . . f 5 5 5 5 5 5 f . . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . f f f f f f f f . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . . . f f f f . . . . . . 
    `],
200,
character.rule(Predicate.MovingUp)
)
controller.moveSprite(thePlayer)
scene.cameraFollowSprite(thePlayer)
tiles.placeOnRandomTile(thePlayer, assets.tile`myTile2`)
tiles.coverAllTiles(assets.tile`myTile2`, sprites.castle.tileGrass1)
tools = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 2 2 2 2 2 . . e e e e 
    . . e e 2 e e e e 2 e . . 2 2 . 
    . 2 . e 2 2 2 1 2 2 e . 2 2 . . 
    2 . . e 2 2 2 2 2 2 2 2 2 2 . . 
    2 . . e 2 2 2 2 2 2 2 2 2 . . . 
    2 . . e 2 2 2 2 2 2 2 e . . . . 
    e . . e 2 2 2 2 2 2 2 . . . . . 
    . e . e 2 2 2 2 2 2 2 . . . . . 
    . . e e 2 2 2 2 2 2 2 . . . . . 
    . . . e 2 2 2 2 2 2 2 . . . . . 
    . . . e 2 2 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . 4 . . . . . . . . . . . . 
    . . . e 4 . . . . . . . . . . . 
    . . . . e 4 . . . . . . . . . . 
    . . . . . e 4 . . . . . . . . . 
    . . . . . . e 4 . . . . . . . . 
    . . . . . . . e 4 . . . . . . . 
    . . . . . . . . e 4 . b . . . . 
    . . . . . . . . . e b b b . . . 
    . . . . . . . . . b b b b b . . 
    . . . . . . . . c b b b b b . . 
    . . . . . . . . . c b b b b . . 
    . . . . . . . . . . c c c . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . b c . . . . . . . . . . . 
    . . b b c . . . . . . . . . . . 
    . . b c . . . . . . . . . . . . 
    . . b c . . . . . . . . . . . . 
    . . c e 4 . . . . . . . . . . . 
    . . . . e 4 . . . . . . . . . . 
    . . . . . e 4 . . . . . . . . . 
    . . . . . . e 4 . . . . . . . . 
    . . . . . . . e 4 . . . . . . . 
    . . . . . . . . e 4 . . . . . . 
    . . . . . . . . . e 4 . . . . . 
    . . . . . . . . . . e 4 . . . . 
    . . . . . . . . . . . e 4 . . . 
    . . . . . . . . . . . . e 4 . . 
    . . . . . . . . . . . . . e 4 . 
    `,
img`
    . . . . . . . . . . b . . . . . 
    . . . . . . . . . b b . . . . . 
    . . . . . . . . b b c c . . . . 
    . . . . b . . b b c c b b . . . 
    . . . b b . c c c c b b b b . . 
    . . b b b . . . c b b b b b b . 
    . b b c c b . . . c c b b b b c 
    c c c c b b b . . . c c b b b c 
    c c c b b b b b . . b c b b b b 
    . . c b b b b b b . b c b b b b 
    . . . c b b b b b c c . b . b c 
    . . . c b b b b b . c c b . b c 
    . . . . c c b b c b . . b . b . 
    . . . . c . c b . c b . b . . . 
    . . . . c . . c b . c . . . . . 
    . . . . c . . . c . . . . . . . 
    `
]
tool_names = [
"watering can",
"shovel",
"hoe",
"gloves"
]
