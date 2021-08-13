import * as ui from "@dcl/ui-scene-utils";

export class createModel {

    static VoxterData = [
        {
            voxnumber: '578',
            transform: { x: 8, z: 8 },
            name: "Weaver VOX #578",
            outfit: "Fashion Designer",
            hairstyle: "Curly",
            facialhair: "Hungarian Mustache",
            link: "https://opensea.io/assets/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/1162"
        },
        {
            voxnumber: '3105',
            transform: { x: 4, z: 12 },
            name: "Farmer VOX #3105",
            outfit: "Farmer Dungarees",
            hairstyle: "Cornrows",
            facialhair: "Hungarian Mustache",
            link: "https://opensea.io/assets/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/3689"
        },
        {
            voxnumber: '1',
            transform: { x: 12, z: 4 },
            name: "Freight Captain VOX #6684",
            outfit: "Admiral Uniform Day Off",
            hairstyle: "Cornrows",
            facialhair: "Brush Mustache",
            link: "https://opensea.io/assets/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/7268"
        },
        {
            voxnumber: '7910',
            transform: { x: 4, z: 4 },
            name: "Lumberjack VOX #7910",
            outfit: "Lumberjack Date Night",
            hairstyle: "Ponytail",
            facialhair: "Goatee Beard",
            link: "https://opensea.io/assets/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/8494"
        },
        {
            voxnumber: '2703',
            transform: { x: 12, z: 12 },
            name: "Factory Worker VOX #2703",
            outfit: "Metal Worker",
            hairstyle: "Bangs",
            facialhair: "Handlebar Mustache",
            link: "https://opensea.io/assets/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/3287"
        },
    ]
    Create(scene) {
        for (const mData of createModel.VoxterData) {

            // let url = "https://www.collectvox.com/metadata/town-star/" + mData.voxnumber
            // log(url)
            // let data = {}

            // executeTask(async () => {
            //     try {
            //         let response = await fetch(url)
            //         let json = await response.json()
            //         data = json
            //         log(data)
            //     } catch {
            //         log("failed to reach URL")
            //     }
            // })


            const CollMaterial = new Material()
            let transparentRed = new Color4(0, 0, 0, 0)
            CollMaterial.albedoColor = transparentRed

            const model = new Entity("Human_" + mData.voxnumber)
            model.setParent(scene)
            const gltfShape = new GLTFShape("models/" + mData.voxnumber + ".glb")
            gltfShape.withCollisions = true
            gltfShape.isPointerBlocker = true
            gltfShape.visible = true
            model.addComponentOrReplace(gltfShape)
            model.addComponentOrReplace(new Transform({
                position: new Vector3(mData.transform.x, 0, mData.transform.z),
            }))
            const Collider = new Entity('Collider_' + mData.voxnumber)
            Collider.addComponentOrReplace(new BoxShape())
            Collider.setParent(model)
            Collider.addComponentOrReplace(new Transform({
                scale: new Vector3(2.5, 6, 2)
            }))
            Collider.addComponentOrReplace(CollMaterial)

            //InfoMBox
            Collider.addComponent(
                new OnPointerDown(async () => {
                    let prompt = new ui.OptionPrompt(
                        'Name: ' + mData.name,
                        'Outfit: ' +mData.outfit + '\n' + '\n' +
                        'Hair Style: ' + mData.hairstyle + '\n' + '\n' +
                        'Facial Hair: ' + mData.facialhair,
                        () => {
                            openExternalURL(mData.link)
                        },
                        () => {
                            prompt.close()
                        },
                        'OpenSea',
                        'Close'
                    )
                }, {
                    hoverText: mData.name,
                    distance: 5,
                    button: ActionButton.POINTER
                })
            )
        }
    }
}