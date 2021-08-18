import * as ui from "@dcl/ui-scene-utils";

import vox_578 from "vox_jsons/578"
import vox_3105 from "vox_jsons/3105"
import vox_7910 from "vox_jsons/7910"
import vox_6684 from "vox_jsons/6684"
import vox_2703 from "vox_jsons/2703"

export class createModel {
    static opensea_baseurl = 'https://opensea.io/assets/0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c/'

    static VoxterData = [
        {
            voxnumber: '578',
            transform: { x: 8, z: 8 },
            data: vox_578,
            token_id: "1162"
        },
        {
            voxnumber: '3105',
            transform: { x: 4, z: 12 },
            data: vox_3105,
            token_id: "3689"
        },
        {
            voxnumber: '1',
            transform: { x: 12, z: 4 },
            data: vox_6684,
            token_id: "7268"
        },
        {
            voxnumber: '7910',
            transform: { x: 4, z: 4 },
            data: vox_7910,
            token_id: "8494"
        },
        {
            voxnumber: '2703',
            transform: { x: 12, z: 12 },
            data: vox_2703,
            token_id: "3287"
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

            const dispay_attrs = ['Outfit', 'Hair Color', 'Facial Hair', 'Hair Style']
            let description = ''
            mData.data.attributes.filter(x => dispay_attrs.indexOf(x.trait_type) >= 0)
                .every(x => {
                    description += x.trait_type + ': ' + x.value + '\n'
                    return true
                })
            //InfoMBox
            Collider.addComponent(
                new OnPointerDown(async () => {
                    let prompt = new ui.OptionPrompt(
                        mData.data.name,
                        description,
                        () => {
                            openExternalURL(createModel.opensea_baseurl+mData.token_id)
                        },
                        () => {
                            prompt.close()
                        },
                        'OpenSea',
                        'Close'
                    )
                }, {
                    hoverText: mData.data.name,
                    distance: 5,
                    button: ActionButton.POINTER
                })
            )
        }
    }
}